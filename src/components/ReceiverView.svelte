<script lang="ts">
  import confetti from "canvas-confetti";
  import { type Card } from "../lib/cards";
  import { CardState } from "../lib/cards.svelte";
  import { ReceiverViewLogic } from "../lib/receiver.svelte";
  import CardDisplay from "./CardDisplay.svelte";

  interface Props {
    id: string;
    initialCard: Card;
  }

  let { id, initialCard }: Props = $props();

  // Pass getter to ensure reactivity and avoid state_referenced_locally warning
  const cardState = new CardState(() => id);
  let card = $derived(cardState.data || initialCard);

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
