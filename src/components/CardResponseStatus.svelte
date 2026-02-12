<script lang="ts">
  import { fly } from "svelte/transition";

  interface Props {
    status: "accepted" | "declined" | "replied";
    sender: string;
    useCustomButtons?: boolean;
    button1Text?: string;
    button2Text?: string;
    onShowReview: () => void;
  }

  let {
    status,
    sender,
    useCustomButtons,
    button1Text,
    button2Text,
    onShowReview,
  }: Props = $props();
</script>

<div
  class="col-start-1 row-start-1 w-full flex flex-col items-center"
  in:fly={{ x: -50, duration: 400, delay: 150 }}
  out:fly={{ x: -50, duration: 300 }}
>
  {#if status === "accepted"}
    <h1 class="text-4xl font-bold text-deep-raspberry animate-heartbeat">
      YAY! ❤️
    </h1>
    <p class="text-2xl mt-8 mb-4 text-deep-raspberry">
      I'm so happy, {sender}!
    </p>
    <div class="text-6xl mt-4">🥰🌹✨</div>
  {:else if status === "declined"}
    <h1 class="text-3xl font-bold text-gray-700">Oh no... 💔</h1>
    <p class="text-lg text-gray-600">Maybe next time, {sender}?</p>
    <div class="text-6xl mt-4">😢🥀</div>
  {:else if status === "replied"}
    <h1 class="text-4xl font-bold text-vivid-pink animate-pulse">
      Replied! 💌
    </h1>
    <p class="text-2xl text-deep-raspberry">Message sent to {sender}!</p>
    <div class="text-6xl mt-4">📨✨</div>
  {/if}

  <button
    onclick={onShowReview}
    class="mt-6 text-md bg-deep-raspberry/10 text-deep-raspberry font-bold py-2 px-4 rounded-xl hover:bg-deep-raspberry/20 transition-all hover:scale-105"
  >
    See your reply
  </button>
</div>
