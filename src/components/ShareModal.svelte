<script lang="ts">
  import QRCode from "qrcode";

  interface Props {
    url: string;
    isOpen: boolean;
    onClose: () => void;
  }

  let { url, isOpen, onClose }: Props = $props();

  let canvas = $state<HTMLCanvasElement | null>(null);
  let copySuccess = $state(false);

  $effect(() => {
    if (isOpen && canvas && url) {
      QRCode.toCanvas(
        canvas,
        url,
        {
          width: 200,
          margin: 2,
          color: {
            dark: "#000000", // Black for best scannability
            light: "#FFFFFF", // Pure white for best contrast
          },
        },
        (error) => {
          if (error) console.error("QR Code Error:", error);
        },
      );
    }
  });

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(url);
      copySuccess = true;
      setTimeout(() => {
        copySuccess = false;
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }
</script>

{#if isOpen}
  <!-- Backdrop -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    onclick={onClose}
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in"
  >
    <!-- Modal -->
    <div
      onclick={(e) => e.stopPropagation()}
      class="bg-white p-8 rounded-3xl max-w-sm w-full shadow-2xl flex flex-col items-center gap-6 relative animate-pop-in border border-vivid-pink/30"
    >
      <button
        onclick={onClose}
        aria-label="Close modal"
        class="absolute top-4 right-4 text-deep-raspberry/60 hover:text-vivid-pink transition-all p-2 hover:scale-110 hover:rotate-90 active:scale-95"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>

      <h2 class="text-2xl font-bold text-deep-raspberry">Share the Love</h2>

      <div
        class="bg-white p-4 rounded-2xl border-2 border-vivid-pink/10 shadow-sm"
      >
        <canvas bind:this={canvas} class="rounded-lg"></canvas>
      </div>

      <div class="w-full flex flex-col gap-2">
        <p
          class="text-xs font-bold text-deep-raspberry/60 uppercase tracking-widest text-center"
        >
          Card Link
        </p>
        <div class="flex gap-2">
          <input
            type="text"
            readonly
            value={url}
            class="flex-1 p-2 text-xs rounded-lg bg-lavender-blush/30 border border-vivid-pink/20 text-deep-raspberry font-medium outline-none"
          />
          <button
            onclick={copyToClipboard}
            class="bg-vivid-pink text-white px-4 py-2 rounded-lg text-xs font-bold skeuo-button whitespace-nowrap transition-all hover:scale-[1.05] active:scale-95"
          >
            {copySuccess ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <p
        class="text-xs text-deep-raspberry/60 italic text-center leading-relaxed"
      >
        Scanning the QR code will take your Valentine directly to their card.
      </p>
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
