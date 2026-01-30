<script lang="ts">
  import { CreateCardFormState } from '../lib/create-card.svelte';
  import type { AuthState } from '../lib/auth.svelte';

  interface Props {
    authState: AuthState;
  }

  let { authState }: Props = $props();

  const form = new CreateCardFormState(authState.user?.senderName, authState.user?.username);

  function onCardCreated(id: string) {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sent_card_ids');
      const ids = saved ? JSON.parse(saved) : [];
      localStorage.setItem('sent_card_ids', JSON.stringify([...ids, id]));
      window.dispatchEvent(new Event('card-created'));
    }
  }
</script>

<form onsubmit={async (e) => { 
  e.preventDefault(); 
  await form.submit(); 
  if (form.success) onCardCreated(form.success); 
}} class="glass p-8 rounded-2xl flex flex-col gap-4 max-w-md w-full mx-auto">
  <h2 class="text-2xl font-bold text-deep-raspberry mb-4">Create Your Valentine</h2>
  
  <div class="flex flex-col gap-1">
    <label for="sender" class="text-sm font-medium text-deep-raspberry">From</label>
    <input
      type="text"
      id="sender"
      bind:value={form.sender}
      readonly
      class="p-2 rounded-lg bg-gray-100/50 border border-gray-300 text-gray-500 outline-none"
    />
  </div>

  <div class="flex flex-col gap-1">
    <label for="receiver" class="text-sm font-medium text-deep-raspberry">To (Their Name)</label>
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
    <label for="message" class="text-sm font-medium text-deep-raspberry">Message</label>
    <textarea
      id="message"
      bind:value={form.message}
      required
      placeholder="Write something sweet..."
      class="p-2 rounded-lg bg-white/50 border border-vivid-pink/30 focus:border-vivid-pink outline-none transition-all min-h-[100px]"
    ></textarea>
  </div>

  <div class="flex flex-col gap-1">
    <label for="theme" class="text-sm font-medium text-deep-raspberry">Theme</label>
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

  <button
    type="submit"
    disabled={form.submitting}
    class="mt-4 bg-vivid-pink text-white font-bold py-3 rounded-xl skeuo-button disabled:opacity-50 animate-heartbeat"
  >
    {form.submitting ? 'Sending...' : 'Send Love'}
  </button>

  {#if form.error}
    <p class="text-red-600 text-sm mt-2">{form.error}</p>
  {/if}

  {#if form.success}
    <div class="mt-4 p-4 bg-green-100/50 rounded-lg border border-green-500/30 text-green-800 text-sm break-all">
      Card created! Share this link: {window.location.origin}/card/{form.success}
    </div>
  {/if}
</form>
