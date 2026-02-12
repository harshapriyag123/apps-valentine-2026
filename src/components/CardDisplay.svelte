<script lang="ts">
  import { fly, scale } from "svelte/transition";
  import type { Card } from "../lib/cards";
  import CardResponseStatus from "./CardResponseStatus.svelte";
  import CardHeader from "./CardHeader.svelte";
  import CardMessage from "./CardMessage.svelte";
  import CardButtons from "./CardButtons.svelte";
  import CardReplyPrompt from "./CardReplyPrompt.svelte";

  interface Props {
    card: Card;
    previewMode?: boolean;
    previewShowMessagePrompt?: boolean;
    onYes?: (replyText?: string) => void | Promise<void>;
    onNo?: (replyText?: string) => void | Promise<void>;
    onNoHover?: () => void;
    yesButtonScale?: number;
    noButtonPos?: { x: number; y: number };
    // Reply props
    replyText?: string;
    replySubmitting?: boolean;
    replySuccess?: boolean;
    onReplySubmit?: () => void;
  }

  let {
    card,
    previewMode = false,
    previewShowMessagePrompt = false,
    onYes,
    onNo,
    onNoHover,
    yesButtonScale = 1,
    noButtonPos = { x: 0, y: 0 },
    replyText = $bindable(""),
    replySubmitting = false,
    replySuccess = false,
    onReplySubmit,
  }: Props = $props();

  let validationError = $state<string | null>(null);
  let showReview = $state(false);
  let selectedChoice = $state<"yes" | "no" | null>(null);

  // Track if user manually triggered the message prompt (for non-preview mode)
  let userTriggeredPrompt = $state(false);

  // In preview mode, follow the prop;
  // In real mode, if hideButtons is true and allowReply is true, show prompt immediately
  // Otherwise follow user interaction
  let showMessagePrompt = $derived(
    previewMode
      ? previewShowMessagePrompt
      : (card.hideButtons && card.allowReply) || userTriggeredPrompt,
  );

  // Update selectedChoice reactively in preview mode or when hideButtons is active
  $effect(() => {
    if (previewMode && previewShowMessagePrompt) {
      selectedChoice = "yes";
    } else if (previewMode && !previewShowMessagePrompt) {
      selectedChoice = null;
    } else if (
      !previewMode &&
      card.hideButtons &&
      card.allowReply &&
      !selectedChoice
    ) {
      // Auto-select "yes" when buttons are hidden (receiver has no choice UI)
      selectedChoice = "yes";
    }
  });

  function handleYesClick() {
    validationError = null;

    if (card.allowReply) {
      // Show message prompt after choosing Yes
      selectedChoice = "yes";
      userTriggeredPrompt = true;
    } else {
      // No reply option, submit immediately
      onYes?.();
    }
  }

  function handleNoClick() {
    validationError = null;

    if (card.allowReply) {
      // Show message prompt after choosing No
      selectedChoice = "no";
      userTriggeredPrompt = true;
    } else {
      // No reply option, submit immediately
      onNo?.();
    }
  }

  async function handleFinalSubmit() {
    // Validate: if hideButtons is true, replyText is required
    if (card.hideButtons && !replyText.trim()) {
      validationError = "Please enter a message";
      return;
    }

    validationError = null;

    if (selectedChoice === "yes") {
      await onYes?.(replyText.trim() || undefined);
    } else if (selectedChoice === "no") {
      await onNo?.(replyText.trim() || undefined);
    }

    userTriggeredPrompt = false;
    selectedChoice = null;
  }

  function handleBackFromPrompt() {
    userTriggeredPrompt = false;
    selectedChoice = null;
    replyText = "";
  }

  const themeClasses = {
    romantic: "border-vivid-pink !bg-white/30 font-romantic",
    playful: "border-blue-400 !bg-blue-50/50 font-playful",
    elegant: "border-silver-grey !bg-purple-50/40 font-elegant",
  };
</script>

{#key `${card.theme}-${card.hideButtons}-${card.allowReply}`}
  <div
    in:scale={{ duration: 800, start: 0.7 }}
    class="glass min-w-[min(100%,_22rem)] max-w-lg w-full p-8 rounded-3xl text-center grid grid-cols-1 place-items-center relative z-10 {themeClasses[
      card.theme
    ]}"
  >
    {#if !showReview && ["accepted", "declined", "replied"].includes(card.status)}
      <CardResponseStatus
        status={card.status as "accepted" | "declined" | "replied"}
        sender={card.sender}
        useCustomButtons={card.useCustomButtons}
        button1Text={card.button1Text}
        button2Text={card.button2Text}
        onShowReview={() => (showReview = true)}
      />
    {:else}
      <div
        class="col-start-1 row-start-1 w-full flex flex-col items-center"
        in:fly={{ x: 50, duration: 400, delay: 150 }}
        out:fly={{ x: 50, duration: 300 }}
      >
        <CardHeader receiver={card.receiver} title={card.title} />

        <CardMessage message={card.message} />

        {#if !card.hideButtons}
          {#if !showReview && (!showMessagePrompt || previewMode)}
            <CardButtons
              useCustomButtons={card.useCustomButtons}
              button1Text={card.button1Text}
              button2Text={card.button2Text}
              status={card.status}
              {previewMode}
              {showReview}
              {replySubmitting}
              {showMessagePrompt}
              {yesButtonScale}
              {noButtonPos}
              {validationError}
              onYesClick={handleYesClick}
              onNoClick={handleNoClick}
              {onNoHover}
            />
          {:else}
            <div class="h-4 mt-4 flex items-center justify-center">
              {#if card.status === "accepted"}
                <p class="text-2xl font-bold text-deep-raspberry animate-pulse">
                  You replied with {card.useCustomButtons
                    ? card.button1Text
                    : "Yes!"} 💖
                </p>
              {:else if card.status === "declined"}
                <p class="text-2xl font-bold text-gray-600">
                  You replied with {card.useCustomButtons
                    ? card.button2Text
                    : "No"}
                </p>
              {/if}
            </div>
          {/if}

          {#if validationError && !showReview}
            <p class="text-lg text-vivid-pink font-bold animate-shake">
              {validationError}
            </p>
          {/if}
        {/if}

        {#if showMessagePrompt && !showReview}
          <CardReplyPrompt
            sender={card.sender}
            {selectedChoice}
            bind:replyText
            {replySubmitting}
            onSubmit={handleFinalSubmit}
            onBack={handleBackFromPrompt}
            hideButtons={card.hideButtons}
            {validationError}
          />
        {/if}

        {#if card.replyText}
          <div
            class="p-4 mt-6 bg-white/40 backdrop-blur-sm rounded-2xl border-2 border-vivid-pink/20 max-w-md w-full"
          >
            <p class="text-lg font-semibold text-deep-raspberry/60 mb-2">
              Your message:
            </p>
            <p class="text-xl text-deep-raspberry/90 italic leading-relaxed">
              "{card.replyText}"
            </p>
          </div>
        {/if}

        <span class="text-3xl text-deep-raspberry/40 my-2"
          >From: {card.sender}</span
        >

        {#if showReview}
          <button
            onclick={() => (showReview = false)}
            class="text-sm bg-black/5 text-black/60 font-bold py-2 px-6 rounded-xl hover:bg-black/10 transition-all hover:scale-105 mx-auto"
          >
            Back
          </button>
        {/if}
      </div>
    {/if}
  </div>
{/key}
