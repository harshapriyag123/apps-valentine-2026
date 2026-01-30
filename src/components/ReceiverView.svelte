<script lang="ts">
  import { onMount } from 'svelte';
  import { type Card } from '../lib/cards';
  import { CardState } from '../lib/cards.svelte';
  import { ReceiverViewLogic } from '../lib/receiver.svelte';
  import confetti from 'canvas-confetti';

  interface Props {
    id: string;
    initialCard: Card;
  }

  let { id, initialCard }: Props = $props();
  
  const cardState = new CardState(id);
  let card = $derived(cardState.data || initialCard);
  
  const logic = new ReceiverViewLogic(id, initialCard, () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  });

  onMount(async () => {
    await logic.markAsViewed();
  });

  async function handleYes() {
    await logic.accept();
  }

  async function handleNo() {
    await logic.decline();
  }

  const themeClasses = {
    romantic: 'border-vivid-pink bg-white/30',
    playful: 'border-orange-400 bg-orange-50/30',
    elegant: 'border-deep-raspberry bg-white/20'
  };
</script>

<div class="glass max-w-lg w-full p-8 rounded-3xl text-center flex flex-col gap-6 relative z-10 {themeClasses[card.theme]}">
  {#if card.status === 'accepted'}
    <h1 class="text-4xl font-bold text-deep-raspberry animate-heartbeat">YAY! ❤️</h1>
    <p class="text-xl text-deep-raspberry">I'm so happy, {card.sender}!</p>
    <div class="text-6xl mt-4">🥰🌹✨</div>
  {:else if card.status === 'declined'}
    <h1 class="text-3xl font-bold text-gray-700">Oh no... 💔</h1>
    <p class="text-lg text-gray-600">Maybe next time, {card.sender}?</p>
    <div class="text-6xl mt-4">😢🥀</div>
  {:else}
    <div class="flex flex-col gap-2">
      <span class="text-vivid-pink font-medium tracking-widest uppercase text-sm">To: {card.receiver}</span>
      <h1 class="text-4xl font-bold text-deep-raspberry">Will you be my Valentine?</h1>
    </div>

    <p class="text-lg text-deep-raspberry/80 italic leading-relaxed py-4">
      "{card.message}"
    </p>

    <div class="flex justify-center gap-6 mt-4 items-center h-20">
      <button
        onclick={handleYes}
        style="transform: scale({logic.yesButtonScale})"
        class="bg-vivid-pink text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-deep-raspberry transition-all z-20"
      >
        Yes!
      </button>

      <button
        onmouseenter={() => logic.handleNoHover()}
        onclick={handleNo}
        style="transform: translate({logic.noButtonPos.x}px, {logic.noButtonPos.y}px)"
        class="bg-gray-200 text-gray-700 font-bold py-3 px-8 rounded-full shadow-md hover:bg-gray-300 transition-all z-10"
      >
        No
      </button>
    </div>
    
    <span class="text-xs text-deep-raspberry/40 mt-4">From: {card.sender}</span>
  {/if}
</div>
