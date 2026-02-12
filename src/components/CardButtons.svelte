<script lang="ts">
  import { scale } from "svelte/transition";

  interface Props {
    useCustomButtons?: boolean;
    button1Text?: string;
    button2Text?: string;
    status: string;
    previewMode: boolean;
    showReview: boolean;
    replySubmitting: boolean;
    showMessagePrompt: boolean;
    yesButtonScale: number;
    noButtonPos: { x: number; y: number };
    validationError: string | null;
    onYesClick: () => void;
    onNoClick: () => void;
    onNoHover?: () => void;
  }

  let {
    useCustomButtons,
    button1Text,
    button2Text,
    status,
    previewMode,
    showReview,
    replySubmitting,
    showMessagePrompt,
    yesButtonScale,
    noButtonPos,
    validationError,
    onYesClick,
    onNoClick,
    onNoHover,
  }: Props = $props();
</script>

{#if !showReview && (!showMessagePrompt || previewMode)}
  <div
    class="flex justify-center gap-8 md:gap-6 items-center h-24"
    in:scale={{ duration: 400, start: 0.5, opacity: 0 }}
    out:scale={{ duration: 300, start: 0.5, opacity: 0 }}
  >
    <button
      onclick={onYesClick}
      disabled={previewMode || showReview || replySubmitting}
      style="transform: scale({yesButtonScale})"
      class="bg-vivid-pink text-white font-bold py-4 px-10 min-h-[48px] rounded-full skeuo-button z-20 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-110"
    >
      {useCustomButtons ? button1Text : "Yes!"}
    </button>

    <button
      onmouseenter={onNoHover}
      onclick={onNoClick}
      disabled={previewMode || showReview || replySubmitting}
      style="transform: translate({noButtonPos.x}px, {noButtonPos.y}px)"
      class="bg-gray-200 text-gray-700 font-bold py-4 px-10 min-h-[48px] rounded-full shadow-md hover:bg-gray-300 transition-all z-10 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
    >
      {useCustomButtons ? button2Text : "No"}
    </button>
  </div>
{:else}
  <div class="h-4 mt-4 flex items-center justify-center">
    {#if status === "accepted"}
      <p class="text-2xl font-bold text-deep-raspberry animate-pulse">
        You replied with {useCustomButtons ? button1Text : "Yes!"} 💖
      </p>
    {:else if status === "declined"}
      <p class="text-2xl font-bold text-gray-600">
        You replied with {useCustomButtons ? button2Text : "No"}
      </p>
    {/if}
  </div>
{/if}

{#if validationError && !showReview}
  <p class="text-lg text-vivid-pink font-bold animate-shake">
    {validationError}
  </p>
{/if}
