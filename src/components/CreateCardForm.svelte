<script lang="ts">
  import { Timestamp } from "firebase/firestore";
  import { fly, fade, scale } from "svelte/transition";
  import { backOut } from "svelte/easing";
  import { onMount } from "svelte";
  import type { AuthState } from "../lib/auth.svelte";
  import { CreateCardFormState } from "../lib/create-card.svelte";
  import { uiState } from "../lib/ui.svelte";
  import CardDisplay from "./CardDisplay.svelte";
  import ConfirmModal from "./ConfirmModal.svelte";

  interface Props {
    authState: AuthState;
  }

  let { authState }: Props = $props();

  const form = new CreateCardFormState();

  $effect(() => {
    if (authState.user) {
      form.sender = authState.user.senderName;
      form.senderUsername = authState.user.username;
    }
  });

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

  // Default to false for SSR consistency (Mobile-first)
  let isDesktop = $state(false);
  let showHeart = $state(false);
  let heartTimeout: ReturnType<typeof setTimeout>;

  onMount(() => {
    const updateMedia = () => {
      isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    };
    updateMedia();
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  // Derived visibility state
  let showEdit = $derived(isDesktop || activeTab === "edit");
  let showPreview = $derived(isDesktop || activeTab === "preview");

  function triggerHeart() {
    if (isDesktop) return;
    showHeart = false;
    clearTimeout(heartTimeout);
    // Small delay to ensure DOM teardown/re-render if triggered rapidly
    setTimeout(() => {
      showHeart = true;
      heartTimeout = setTimeout(() => {
        showHeart = false;
      }, 800);
    }, 50);
  }

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
    title: form.title,
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
<div
  class="heart-pulse-overlay pointer-events-none fixed inset-0 flex items-center justify-center z-50"
  data-testid="heart-pulse-overlay"
>
  {#if !isDesktop && showHeart}
    <div
      class="text-vivid-pink/40"
      in:scale={{ duration: 600, start: 0.5, opacity: 0 }}
      out:fade={{ duration: 200 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-48 h-48 drop-shadow-2xl filter blur-sm"
      >
        <path
          d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
        ></path>
      </svg>
    </div>
  {/if}
</div>

<div
  class="flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-center max-w-6xl mx-auto w-full px-4 pt-4 pb-8"
>
  <!-- Mobile Tabs Toggle -->
  {#if !isDesktop}
    <div
      class="flex w-full p-1 bg-gray-100 rounded-xl mb-4"
      transition:fly={{ y: -20, duration: 300, easing: backOut }}
    >
      <button
        onclick={() => {
          activeTab = "edit";
          triggerHeart();
        }}
        class="flex-1 py-2 text-sm font-bold rounded-lg transition-all hover:scale-105 active:scale-95 {activeTab ===
        'edit'
          ? 'bg-white text-vivid-pink shadow-sm'
          : 'text-gray-500'}"
      >
        Edit
      </button>
      <button
        onclick={() => {
          activeTab = "preview";
          triggerHeart();
        }}
        class="flex-1 py-2 text-sm font-bold rounded-lg transition-all hover:scale-105 active:scale-95 {activeTab ===
        'preview'
          ? 'bg-white text-vivid-pink shadow-sm'
          : 'text-gray-500'}"
      >
        Preview
      </button>
    </div>
  {/if}

  <!-- Form Section -->
  {#if showEdit}
    <div
      class="w-full max-w-md"
      in:fly={{ x: -20, duration: 400, delay: 150, easing: backOut }}
      out:fly={{ x: -20, duration: 300, easing: backOut }}
    >
      <form
        onsubmit={handleSubmitRequest}
        class="glass p-8 rounded-2xl flex flex-col gap-4 w-full mb-16 lg:mb-0"
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
          <label for="receiver" class="text-sm font-medium text-deep-raspberry"
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
          <label for="title" class="text-sm font-medium text-deep-raspberry"
            >Title (Optional)</label
          >
          <input
            type="text"
            id="title"
            bind:value={form.title}
            placeholder="Will you be my Valentine?"
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
    </div>
  {/if}

  <!-- Preview Section -->
  {#if showPreview}
    <div
      class="flex flex-col gap-4 w-full max-w-lg lg:sticky lg:top-8"
      in:fly={{ x: 20, duration: 400, delay: 150, easing: backOut }}
      out:fly={{ x: 20, duration: 300, easing: backOut }}
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
  {/if}

  <!-- Sticky Mobile Action Button -->
  {#if !isDesktop}
    <div
      class="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-200 z-50"
    >
      <button
        onclick={() => handleSubmitRequest()}
        disabled={form.submitting}
        class="w-full bg-vivid-pink text-white font-bold py-4 rounded-2xl skeuo-button shadow-lg disabled:opacity-50"
      >
        {form.submitting ? "Sending..." : "Send Love"}
      </button>
    </div>
  {/if}
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
