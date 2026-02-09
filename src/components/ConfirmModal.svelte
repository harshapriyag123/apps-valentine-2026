<script lang="ts">
  interface Props {
    isOpen: boolean;
    title?: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
  }

  let {
    isOpen,
    title = "Confirm",
    message,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    onConfirm,
    onCancel,
  }: Props = $props();
</script>

{#if isOpen}
  <!-- Backdrop -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    onclick={onCancel}
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4 animate-fade-in"
  >
    <!-- Modal -->
    <div
      onclick={(e) => e.stopPropagation()}
      class="bg-white p-8 rounded-3xl max-w-sm w-full shadow-2xl flex flex-col items-center gap-6 relative animate-pop-in border border-vivid-pink/30"
    >
      <h2 class="text-2xl font-bold text-deep-raspberry text-center">
        {title}
      </h2>

      <p class="text-gray-600 text-center leading-relaxed">
        {message}
      </p>

      <div class="flex flex-col w-full gap-3 mt-2">
        <button
          onclick={onConfirm}
          class="w-full bg-vivid-pink text-white font-bold py-3 rounded-xl skeuo-button shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {confirmLabel}
        </button>
        <button
          onclick={onCancel}
          class="w-full bg-gray-100 text-gray-500 font-bold py-3 rounded-xl hover:bg-gray-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {cancelLabel}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes pop-in {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.2s ease-out;
  }

  .animate-pop-in {
    animation: pop-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
</style>
