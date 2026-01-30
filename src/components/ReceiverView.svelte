<script lang="ts">
  import { onMount } from 'svelte';
  import { updateCardStatus, type Card } from '../lib/cards';
  import { CardState } from '../lib/cards.svelte';

  interface Props {
    id: string;
    initialCard: Card;
  }

  let { id, initialCard }: Props = $props();
  
  const cardState = new CardState(id);
  let card = $derived(cardState.data || initialCard);

  let noButtonPos = $state({ x: 0, y: 0 });
  let noButtonScale = $state(1);
  let yesButtonScale = $state(1);
  let responded = $state(false);

  onMount(async () => {
    // Mark as viewed if it's currently 'sent'
    if (card.status === 'sent') {
      await updateCardStatus(id, 'viewed');
    }
  });

  function handleNoHover() {
    // Playful behavior: move the button away
    noButtonPos = {
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200
    };
    // Make yes button grow slightly each time
    yesButtonScale += 0.1;
  }

  async function handleYes() {
    responded = true;
    await updateCardStatus(id, 'accepted');
    // canvas-confetti will be added in the next task
  }

  async function handleNo() {
    responded = true;
    await updateCardStatus(id, 'declined');
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
        style="transform: scale({yesButtonScale})"
        class="bg-vivid-pink text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-deep-raspberry transition-all z-20"
      >
        Yes!
      </button>

      <button
        onmouseenter={handleNoHover}
        onclick={handleNo}
        style="transform: translate({noButtonPos.x}px, {noButtonPos.y}px) scale({noButtonScale})"
        class="bg-gray-200 text-gray-700 font-bold py-3 px-8 rounded-full shadow-md hover:bg-gray-300 transition-all z-10"
      >
        No
      </button>
    </div>
    
    <span class="text-xs text-deep-raspberry/40 mt-4">From: {card.sender}</span>
  {/if}
</div>
