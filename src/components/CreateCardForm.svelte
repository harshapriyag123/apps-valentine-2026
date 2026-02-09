<script lang="ts">
  import { Timestamp } from "firebase/firestore";
  import type { AuthState } from "../lib/auth.svelte";
  import { CreateCardFormState } from "../lib/create-card.svelte";
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
    }
  });

  // Tab state for mobile
  let activeTab = $state<"edit" | "preview">("edit");
  let showConfirmModal = $state(false);

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

<div
  class="flex flex-col lg:flex-row gap-8 items-start justify-center max-w-6xl mx-auto w-full px-4 pt-4 pb-8"
>
  <!-- Mobile Tabs Toggle -->
  <div class="lg:hidden flex w-full p-1 bg-gray-100 rounded-xl mb-4">
    <button
      onclick={() => (activeTab = "edit")}
      class="flex-1 py-2 text-sm font-bold rounded-lg transition-all {activeTab ===
      'edit'
        ? 'bg-white text-vivid-pink shadow-sm'
        : 'text-gray-500'}"
    >
      Edit
    </button>
    <button
      onclick={() => (activeTab = "preview")}
      class="flex-1 py-2 text-sm font-bold rounded-lg transition-all {activeTab ===
      'preview'
        ? 'bg-white text-vivid-pink shadow-sm'
        : 'text-gray-500'}"
    >
      Preview
    </button>
  </div>

  <!-- Form Section -->
  <form
    onsubmit={handleSubmitRequest}
    class="glass p-8 rounded-2xl flex flex-col gap-4 max-w-md w-full {activeTab ===
    'edit'
      ? 'flex'
      : 'hidden lg:flex'}"
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
        class="p-2 rounded-lg bg-white/50 border border-vivid-pink/30 focus:border-vivid-pink outline-none transition-all"
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
        class="p-2 rounded-lg bg-white/50 border border-vivid-pink/30 focus:border-vivid-pink outline-none transition-all min-h-[100px]"
      ></textarea>
    </div>

    <div class="flex flex-col gap-1">
      <label for="theme" class="text-sm font-medium text-deep-raspberry"
        >Theme</label
      >
      <select
        id="theme"
        bind:value={form.theme}
        class="p-2 rounded-lg bg-white/50 border border-vivid-pink/30 focus:border-vivid-pink outline-none transition-all"
      >
        <option value="romantic">Romantic</option>
        <option value="playful">Playful</option>
        <option value="elegant">Elegant</option>
      </select>
    </div>

    <div class="border-t border-vivid-pink/10 pt-4 mt-2 flex flex-col gap-4">
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

      <div class="flex items-center justify-between">
        <label
          for="allowReply"
          class="text-sm font-bold text-deep-raspberry cursor-pointer"
          >Allow Text Reply</label
        >
        <input
          type="checkbox"
          id="allowReply"
          bind:checked={form.allowReply}
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

  <!-- Preview Section -->
  <div
    class="flex-col gap-4 w-full max-w-lg lg:sticky lg:top-8 {activeTab ===
    'preview'
      ? 'flex'
      : 'hidden lg:flex'}"
  >
    <h3
      class="hidden lg:block text-xl font-bold text-deep-raspberry/60 px-2 uppercase tracking-widest text-sm"
    >
      Live Preview
    </h3>
    <div>
      <CardDisplay card={previewCard} previewMode={true} />
    </div>
  </div>

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
