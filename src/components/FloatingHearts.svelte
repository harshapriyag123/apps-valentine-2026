<script lang="ts">
  import { onMount } from 'svelte';

  let hearts = $state<{ id: number; left: number; size: number; duration: number; delay: number }[]>([]);

  onMount(() => {
    const heartCount = 20;
    const newHearts = Array.from({ length: heartCount }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * (30 - 10) + 10,
      duration: Math.random() * (15 - 5) + 5,
      delay: Math.random() * 5
    }));
    hearts = newHearts;
  });
</script>

<div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
  {#each hearts as heart (heart.id)}
    <div
      class="absolute bottom-[-50px] text-vivid-pink/20 animate-float"
      style="
        left: {heart.left}%;
        font-size: {heart.size}px;
        animation-duration: {heart.duration}s;
        animation-delay: {heart.delay}s;
      "
    >
      ❤
    </div>
  {/each}
</div>

<style>
  @keyframes float {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 0.8;
    }
    90% {
      opacity: 0.8;
    }
    100% {
      transform: translateY(-110vh) rotate(360deg);
      opacity: 0;
    }
  }

  .animate-float {
    animation-name: float;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
</style>
