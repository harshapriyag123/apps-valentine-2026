<script lang="ts">
  import { Timestamp } from "firebase/firestore";
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";
  import { AnimatePresence, Motion } from "svelte-motion";
  import type { AuthState } from "../lib/auth.svelte";
  import { CreateCardFormState } from "../lib/create-card.svelte";
  import { uiState } from "../lib/ui.svelte";
  import CardDisplay from "./CardDisplay.svelte";
  import ConfirmModal from "./ConfirmModal.svelte";

  interface Props {
    authState: AuthState;
  }

  let { authState }: Props = $props();

  // Initialize with empty defaults to avoid capturing reactive props in non-reactive constructor
  const form = new CreateCardFormState();

  // Reactively sync user data to the form state
  // This ensures that if the user info updates, the form reflects it,
  // without resetting the entire form state (message, receiver, etc.)
  $effect(() => {
    if (authState.user) {
      form.sender = authState.user.senderName;
      form.senderUsername = authState.user.username;
    }
  });

  // Enforce mutual exclusivity: Custom Choice Buttons vs Hide Choice Buttons
  $effect(() => {
    if (form.useCustomButtons) {
      form.hideButtons = false;
    }
  });

  $effect(() => {
    if (form.hideButtons) {
      form.useCustomButtons = false;
      form.allowReply = true;
    }
  });

  // Tab state for mobile
  let activeTab = $state<"edit" | "preview">("edit");
  let showConfirmModal = $state(false);
  let isDesktop = $state(false);

  onMount(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    isDesktop = media.matches;
    const listener = (e: MediaQueryListEvent) => (isDesktop = e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  });

  // Determine which sections should be visible based on device and tab
  let visibleSections = $derived(
    isDesktop ? [{ key: "edit" }, { key: "preview" }] : [{ key: activeTab }]
  );

  // Animation variants
  const variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  function handleSubmitRequest(e?: Event) {
    if (e) e.preventDefault();
    if (!form.isValid) {
      form.error = "Please fill in all fields.";
      return;
    }
    showConfirmModal = true;
  }

  async function handleConfirmSubmit() {
    showConfirmModal = false;
    await form.submit();
  }

  let previewCard = $derived({
    sender: form.sender,
    senderUsername: form.senderUsername,
    receiver: form.receiver,
    message: form.message,
    theme: form.theme,
    status: "sent" as const,
    useCustomButtons: form.useCustomButtons,
    button1Text: form.button1Text,
    button2Text: form.button2Text,
    hideButtons: form.hideButtons,
    allowReply: form.allowReply,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
</script>

<!-- Heart Pulse Overlay (Mobile Only Trigger) -->
{#key activeTab}
  <div
    class="heart-pulse-overlay pointer-events-none fixed inset-0 flex items-center justify-center z-50"
    data-testid="heart-pulse-overlay"
  >
    {#if !isDesktop}
        <!-- Simple pure CSS or Svelte transition for the pulse to avoid complex orchestration -->
        <div class="text-vivid-pink/20 animate-ping absolute inline-flex h-32 w-32 rounded-full opacity-75"></div>
    {/if}
  </div>
{/key}

<div
  class="flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-center max-w-6xl mx-auto w-full px-4 pt-4 pb-8"
>
  <!-- Mobile Tabs Toggle -->
  <div
    class="lg:hidden flex w-full p-1 bg-gray-100 rounded-xl mb-4"
    transition:fly={{ y: -20, duration: 300 }}
  >
    <button
      onclick={() => (activeTab = "edit")}
      class="flex-1 py-2 text-sm font-bold rounded-lg transition-all hover:scale-105 active:scale-95 {activeTab ===
      'edit'
        ? 'bg-white text-vivid-pink shadow-sm'
        : 'text-gray-500'}"
    >
      Edit
    </button>
    <button
      onclick={() => (activeTab = "preview")}
      class="flex-1 py-2 text-sm font-bold rounded-lg transition-all hover:scale-105 active:scale-95 {activeTab ===
      'preview'
        ? 'bg-white text-vivid-pink shadow-sm'
        : 'text-gray-500'}"
    >
      Preview
    </button>
  </div>

  <AnimatePresence list={visibleSections} let:item>
    {#if item.key === "edit"}
      <Motion
        initial={isDesktop ? false : "hidden"}
        animate="visible"
        exit="exit"
        variants={variants}
        let:motion
      >
        <!-- Form Section -->
        <form
          use:motion
          onsubmit={handleSubmitRequest}
          class="glass p-8 rounded-2xl flex flex-col gap-4 max-w-md w-full mb-16 lg:mb-0 flex"
        >
          <h2 class="text-2xl font-bold text-deep-raspberry mb-4">
            Create Your Valentine
          </h2>

          <div class="flex flex-col gap-1">
            <label for="sender" class="text-sm font-medium text-deep-raspberry"
              >From</label
            >
            <input
              type="text"
              id="sender"
              bind:value={form.sender}
              readonly
              class="p-2 rounded-lg bg-gray-100/50 border border-gray-300 text-gray-500 outline-none"
            />
          </div>

          <div class="flex flex-col gap-1">
            <label
              for="receiver"
              class="text-sm font-medium text-deep-raspberry"
              >To (Their Name)</label
            >
            <input
              type="text"
              id="receiver"
              bind:value={form.receiver}
              required
              placeholder="e.g. Juliet"
              class="p-2 rounded-lg bg-white/50 border border-vivid-pink/30 focus:border-vivid-pink outline-none transition-all focus:scale-[1.01] focus:shadow-md"
            />
          </div>

          <div class="flex flex-col gap-1">
            <label for="message" class="text-sm font-medium text-deep-raspberry"
              >Message</label
            >
            <textarea
              id="message"
              bind:value={form.message}
              required
              placeholder="Write something sweet..."
              class="p-2 rounded-lg bg-white/50 border border-vivid-pink/30 focus:border-vivid-pink outline-none transition-all min-h-[100px] focus:scale-[1.01] focus:shadow-md"
            ></textarea>
          </div>

          <div class="flex flex-col gap-1">
            <label for="theme" class="text-sm font-medium text-deep-raspberry"
              >Theme</label
            >
            <select
              id="theme"
              bind:value={form.theme}
              class="p-2 rounded-lg bg-white/50 border border-vivid-pink/30 focus:border-vivid-pink outline-none transition-all focus:scale-[1.01] focus:shadow-md"
            >
              <option value="romantic">Romantic</option>
              <option value="playful">Playful</option>
              <option value="elegant">Elegant</option>
            </select>
          </div>

          <div
            class="border-t border-vivid-pink/10 pt-4 mt-2 flex flex-col gap-4"
          >
            <div
              class="flex items-center justify-between transition-opacity {form.useCustomButtons
                ? 'opacity-40 pointer-events-none'
                : 'opacity-100'}"
            >
              <label
                for="hideButtons"
                class="text-sm font-bold text-deep-raspberry cursor-pointer"
                >Hide Choice Button</label
              >
              <input
                type="checkbox"
                id="hideButtons"
                bind:checked={form.hideButtons}
                disabled={form.useCustomButtons}
                class="w-5 h-5 accent-vivid-pink cursor-pointer"
              />
            </div>

            <div
              class="flex items-center justify-between transition-opacity {form.hideButtons
                ? 'opacity-40 pointer-events-none'
                : 'opacity-100'}"
            >
              <label
                for="useCustomButtons"
                class="text-sm font-bold text-deep-raspberry cursor-pointer"
                >Custom Choice Buttons</label
              >
              <input
                type="checkbox"
                id="useCustomButtons"
                bind:checked={form.useCustomButtons}
                disabled={form.hideButtons}
                class="w-5 h-5 accent-vivid-pink cursor-pointer"
              />
            </div>

            {#if form.useCustomButtons}
              <div class="grid grid-cols-2 gap-2 animate-fade-in">
                <div class="flex flex-col gap-1">
                  <label
                    for="button1"
                    class="text-[10px] uppercase font-bold text-gray-400"
                    >Button 1</label
                  >
                  <input
                    type="text"
                    id="button1"
                    bind:value={form.button1Text}
                    placeholder="Yes"
                    class="p-2 text-sm rounded-lg bg-white/50 border border-vivid-pink/20 outline-none"
                  />
                </div>
                <div class="flex flex-col gap-1">
                  <label
                    for="button2"
                    class="text-[10px] uppercase font-bold text-gray-400"
                    >Button 2</label
                  >
                  <input
                    type="text"
                    id="button2"
                    bind:value={form.button2Text}
                    placeholder="No"
                    class="p-2 text-sm rounded-lg bg-white/50 border border-vivid-pink/20 outline-none"
                  />
                </div>
              </div>
            {/if}

            <div
              class="flex items-center justify-between transition-opacity {form.hideButtons
                ? 'opacity-40 pointer-events-none'
                : 'opacity-100'}"
            >
              <label
                for="allowReply"
                class="text-sm font-bold text-deep-raspberry cursor-pointer"
                >Allow Text Reply</label
              >
              <input
                type="checkbox"
                id="allowReply"
                bind:checked={form.allowReply}
                disabled={form.hideButtons}
                class="w-5 h-5 accent-vivid-pink cursor-pointer"
              />
            </div>
          </div>

          <!-- Submit button inside form for desktop accessibility -->
          <button
            type="submit"
            disabled={form.submitting}
            class="mt-4 hidden lg:block bg-vivid-pink text-white font-bold py-3 rounded-xl skeuo-button disabled:opacity-50"
          >
            {form.submitting ? "Sending..." : "Send Love"}
          </button>

          {#if form.error}
            <p class="text-red-600 text-sm mt-2">{form.error}</p>
          {/if}

          {#if form.success}
            <div
              class="mt-4 p-4 bg-green-100/50 rounded-lg border border-green-500/30 text-green-800 text-sm break-all"
            >
              Card created! Share this link: {window.location
                .origin}/card/{form.success}
            </div>
          {/if}
        </form>
      </Motion>
    {:else if item.key === "preview"}
      <Motion
        initial={isDesktop ? false : "hidden"}
        animate="visible"
        exit="exit"
        variants={variants}
        let:motion
      >
        <!-- Preview Section -->
        <div
          use:motion
          class="flex flex-col gap-4 w-full max-w-lg lg:sticky lg:top-8 flex"
        >
          <h3
            class="hidden lg:block text-xl font-bold text-deep-raspberry/60 px-2 uppercase tracking-widest"
          >
            Preview
          </h3>
          <div>
            <CardDisplay card={previewCard} previewMode={true} />
          </div>
        </div>
      </Motion>
    {/if}
  </AnimatePresence>

  <!-- Sticky Mobile Action Button -->
  <div
    class="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-200 z-50"
  >
    <button
      onclick={() => handleSubmitRequest()}
      disabled={form.submitting}
      class="w-full bg-vivid-pink text-white font-bold py-4 rounded-2xl skeuo-button shadow-lg disabled:opacity-50"
    >
      {form.submitting ? "Sending..." : "Send Love"}
    </button>
  </div>
</div>

<ConfirmModal
  isOpen={showConfirmModal}
  title="Send Your Love? ❤️"
  message="You can only craft one message per account. Are you sure you want to send this?"
  confirmLabel="Yes, Send it!"
  cancelLabel="Not yet"
  onConfirm={handleConfirmSubmit}
  onCancel={() => (showConfirmModal = false)}
/>
