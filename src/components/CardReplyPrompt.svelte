<script lang="ts">
  import { fly } from "svelte/transition";

  interface Props {
    sender: string;
    selectedChoice: "yes" | "no" | null;
    replyText: string;
    replySubmitting: boolean;
    onSubmit: () => void;
    onBack: () => void;
    hideButtons?: boolean;
    validationError?: string | null;
  }

  let {
    sender,
    selectedChoice,
    replyText = $bindable(""),
    replySubmitting,
    onSubmit,
    onBack,
    hideButtons = false,
    validationError = null,
  }: Props = $props();
</script>

<div
  class="mt-4 pt-6 border-t border-vivid-pink/10 flex flex-col gap-3 w-full"
  in:fly={{ y: 30, duration: 500, opacity: 0 }}
  out:fly={{ y: -20, duration: 300, opacity: 0 }}
>
  {#if !hideButtons}
    <h3 class="text-xl font-bold text-deep-raspberry">
      {selectedChoice === "yes" ? "💖 Great!" : "💔 That's okay!"}
    </h3>
  {/if}
  <p class="text-xl text-deep-raspberry/70">
    {#if hideButtons}
      Add a message to {sender}:
    {:else}
      Want to add a message to {sender}? (Optional)
    {/if}
  </p>

  <textarea
    id="reply"
    bind:value={replyText}
    placeholder={hideButtons
      ? "Type your message here..."
      : "Type your message here (optional)..."}
    required={hideButtons}
    class="p-3 w-full rounded-xl bg-white/50 border border-vivid-pink/20 focus:border-vivid-pink outline-none text-lg text-black/80 min-h-24 transition-all focus:scale-[1.01] focus:shadow-md"
  ></textarea>

  {#if validationError}
    <p class="text-vivid-pink text-sm font-semibold -mt-1">
      {validationError}
    </p>
  {/if}

  <div class="flex flex-col gap-3 w-full">
    <button
      onclick={onSubmit}
      disabled={replySubmitting}
      class="w-full bg-gradient-to-r from-vivid-pink to-deep-raspberry text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.02] text-lg active:scale-95 hover:from-vivid-pink/90 hover:to-deep-raspberry/90"
    >
      {#if replySubmitting}
        💌 Sending...
      {:else if hideButtons}
        💖 Send Message
      {:else if replyText.trim()}
        💖 Send with Message
      {:else}
        ✨ Skip Message
      {/if}
    </button>

    {#if !hideButtons}
      <button
        onclick={onBack}
        disabled={replySubmitting}
        class="w-full py-2.5 px-6 bg-white/40 backdrop-blur-sm border-2 border-deep-raspberry/20 text-deep-raspberry font-semibold rounded-xl hover:bg-white/60 hover:border-deep-raspberry/40 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.01] active:scale-95"
      >
        ← Back
      </button>
    {/if}
  </div>
</div>
