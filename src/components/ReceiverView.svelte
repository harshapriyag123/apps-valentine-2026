<script lang="ts">
  import confetti from "canvas-confetti";
  import { AnimatePresence, Motion } from "svelte-motion";
  import { type Card, getCard } from "../lib/cards";
  import { CardState } from "../lib/cards.svelte";
  import { ReceiverViewLogic } from "../lib/receiver.svelte";
  import CardDisplay from "./CardDisplay.svelte";
  import Envelope from "./Envelope.svelte";
  import { onMount } from "svelte";

  interface Props {
    id: string;
    initialCard?: Card | null;
  }

  let { id, initialCard = null }: Props = $props();
  // Pass getter to ensure reactivity and avoid state_referenced_locally warning
  const cardState = new CardState(() => id);

  // Make initialCard reactive/stateful so derived value can depend on it without
  // reassigning `$derived` (which is only allowed as an initializer).
  let initialCardState = $state<Card | null>(initialCard);

  // Derived `card` that prefers the live `cardState.data`, falling back to the
  // provided `initialCardState` when present. This must be a top-level
  // initializer and must not be reassigned later.
  let card = $derived(cardState.data || initialCardState);

  // If no initialCard was provided by the server, fetch it on the client and
  // update the reactive `initialCardState` so `card` updates automatically.
  onMount(async () => {
    if (!initialCardState) {
      if (typeof navigator !== "undefined" && !navigator.onLine) {
        // Avoid trying to fetch while the browser is offline.
        console.warn("Client offline: skipping card fetch");
        return;
      }

      try {
        const fetched = await getCard(id);
        if (fetched) {
          initialCardState = fetched;
        }
      } catch (err) {
        // Show non-fatal error state instead of throwing so UI remains stable.
        console.warn("Failed to fetch card on client:", err);
      }
    }
  });

  let fetchError = $state<string | null>(null);

  // Unboxing State
  let isOpening = $state(false); // Envelope flap opens
  const answeredStatuses = ["accepted", "declined", "replied"];
  let isOpen = $state(
    // svelte-ignore state_referenced_locally
    Boolean(initialCardState && (answeredStatuses.includes(initialCardState.status) || !!initialCardState.replyText)),
  ); // CardDisplay shown

  function handleOpen() {
    if (isOpening) return;
    isOpening = true;

    // Sequence:
    // 0ms: Flap opens
    // 400ms: Card starts sliding up (inside SVG)
    // 1400ms: Card slide done
    // 1500ms: Switch view
    setTimeout(() => {
      isOpen = true;
    }, 1500);
  }

  // Initialize logic with empty defaults to avoid capturing reactive props in constructor
  // The $effect below will sync the actual values immediately
  const logic = new ReceiverViewLogic("", undefined, () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 0,
    };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  });

  // Sync logic state when props change
  $effect(() => {
    logic.id = id;
    logic.card = card;
    if (card?.replyText) {
      logic.replyText = card.replyText;
      logic.replySuccess = true;
    }
  });

  // Mark as viewed when card/id changes
  $effect(() => {
    logic.markAsViewed();
  });

  async function handleYes(replyText?: string) {
    await logic.accept(replyText);
  }

  async function handleNo(replyText?: string) {
    await logic.decline(replyText);
  }

  async function handleReplySubmit() {
    await logic.submitReply();
  }
</script>

<div class="flex flex-col items-center justify-center min-h-screen scale-110">
  <AnimatePresence
    let:item
    list={isOpen ? [{ key: "card" }] : [{ key: "envelope" }]}
    exitBeforeEnter
  >
    {#if item.key === "envelope"}
      <Motion
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{
          opacity: 0,
          scale: 1.1,
          filter: "blur(10px)",
          transition: { duration: 0.5 },
        }}
        let:motion
      >
        <div
          use:motion
          class="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div class="pointer-events-auto">
            <Envelope
              onclick={handleOpen}
              open={isOpening}
              theme={card?.theme ?? 'romantic'}
            />
          </div>
        </div>
      </Motion>
    {:else}
      <Motion
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, type: "spring", bounce: 0.4 },
        }}
        let:motion
      >
        <div use:motion class="w-full flex justify-center">
          {#if card}
            <CardDisplay
              {card}
              onYes={handleYes}
              onNo={handleNo}
              onNoHover={() => logic.handleNoHover()}
              yesButtonScale={logic.yesButtonScale}
              noButtonPos={logic.noButtonPos}
              bind:replyText={logic.replyText}
              replySubmitting={logic.replySubmitting}
              replySuccess={logic.replySuccess}
              onReplySubmit={handleReplySubmit}
            />
          {:else}
            {#if fetchError}
              <div class="py-8 text-center text-sm text-deep-raspberry/80">{fetchError}</div>
            {:else}
              <div class="py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-vivid-pink"></div>
              </div>
            {/if}
          {/if}
        </div>
      </Motion>
    {/if}
  </AnimatePresence>
</div>
