<script lang="ts">
  import confetti from "canvas-confetti";
  import { AnimatePresence, Motion } from "svelte-motion";
  import { type Card } from "../lib/cards";
  import { CardState } from "../lib/cards.svelte";
  import { ReceiverViewLogic } from "../lib/receiver.svelte";
  import CardDisplay from "./CardDisplay.svelte";
  import Envelope from "./Envelope.svelte";

  interface Props {
    id: string;
    initialCard: Card;
  }

  let { id, initialCard }: Props = $props();

  // Pass getter to ensure reactivity and avoid state_referenced_locally warning
  const cardState = new CardState(() => id);
  let card = $derived(cardState.data || initialCard);

  // Unboxing State
  let isOpening = $state(false); // Envelope flap opens
  let isOpen = $state(false); // CardDisplay shown

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
    logic.card = initialCard;
  });

  // Mark as viewed when card/id changes
  $effect(() => {
    logic.markAsViewed();
  });

  async function handleYes() {
    await logic.accept();
  }

  async function handleNo() {
    await logic.decline();
  }

  async function handleReplySubmit() {
    await logic.submitReply();
  }
</script>

<div class="flex flex-col items-center justify-center min-h-screen">
  <AnimatePresence let:item list={isOpen ? [{key: 'card'}] : [{key: 'envelope'}]} exitBeforeEnter>
    {#if !isOpen}
      <Motion
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 0.5 } }}
        let:motion
      >
        <div use:motion class="absolute inset-0 flex items-center justify-center">
            <Envelope onclick={handleOpen} open={isOpening} />
        </div>
      </Motion>
    {:else}
      <Motion
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.8, type: "spring", bounce: 0.3 } }}
        let:motion
      >
        <div use:motion class="w-full flex justify-center">
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
        </div>
      </Motion>
    {/if}
  </AnimatePresence>
</div>
