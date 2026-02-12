<script lang="ts">
  import type { AuthState } from "../lib/auth.svelte";
  import { DashboardState } from "../lib/dashboard.svelte";
  import { uiState } from "../lib/ui.svelte";

  interface Props {
    authState: AuthState;
  }

  let { authState }: Props = $props();

  // Reactive dashboard state based on the current user
  let dashboard = $derived(
    authState.user ? new DashboardState(authState.user.username) : null,
  );

  const statusColors = {
    sent: "text-gray-500",
    viewed: "text-blue-500",
    accepted: "text-green-500 font-bold",
    declined: "text-red-500",
    replied: "text-purple-600 font-bold",
  };

  // Reply Toggle State
  let expandedReplies = $state<Set<string>>(new Set());

  function toggleReply(cardId: string) {
    if (expandedReplies.has(cardId)) {
      expandedReplies.delete(cardId);
    } else {
      expandedReplies.add(cardId);
    }
    expandedReplies = new Set(expandedReplies); // Trigger reactivity
  }
</script>

<div
  class="glass p-8 rounded-2xl flex flex-col gap-4 max-w-md w-full mx-auto font-standard"
>
  <h2 class="text-2xl font-bold text-deep-raspberry mb-4">Your Sent Cards</h2>

  {#if !dashboard}
    <p class="text-sm text-gray-500 italic">
      Please log in to view your cards.
    </p>
  {:else if dashboard.loading && dashboard.cards.length === 0}
    <p class="text-sm text-gray-500 italic">Checking for cards...</p>
  {:else if dashboard.cards.length === 0}
    <p class="text-sm text-gray-500 italic">You haven't sent any cards yet.</p>
  {:else}
    <div class="flex flex-col gap-3">
      {#each dashboard.cards as card (card.id)}
        <div class="flex flex-col gap-1">
          <div
            class="p-3 bg-white/40 rounded-xl border border-vivid-pink/20 flex justify-between items-center shadow-sm relative z-10"
          >
            <div class="flex flex-col">
              <span class="font-lg text-deep-raspberry"
                >To: {card.receiver}</span
              >
              <div class="flex gap-2 items-center">
                <span class="text-md text-gray-500">Theme: {card.theme}</span>
                {#if card.replyText}
                  <span
                    class="bg-vivid-pink/10 text-vivid-pink text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-tighter"
                  >
                    Has Reply
                  </span>
                {/if}
              </div>
            </div>
            <div class="flex flex-col items-end">
              <span class="text-sm capitalize {statusColors[card.status]}"
                >{card.status}</span
              >
              <div class="flex gap-2">
                {#if card.replyText}
                  <button
                    onclick={() => toggleReply(card.id!)}
                    class="text-[10px] text-deep-raspberry font-bold hover:underline mt-1"
                  >
                    {expandedReplies.has(card.id!) ? "Hide" : "View"} Reply
                  </button>
                {/if}
                <button
                  onclick={() => uiState.openShareModal(card.id!)}
                  class="text-md text-vivid-pink hover:underline mt-1"
                >
                  Share
                </button>
              </div>
            </div>
          </div>

          {#if expandedReplies.has(card.id!) && card.replyText}
            <div
              class="mx-4 p-4 bg-vivid-pink/5 border-x border-b border-vivid-pink/10 rounded-b-xl animate-slide-down"
            >
              <p
                class="text-xs font-bold text-vivid-pink/60 uppercase tracking-widest mb-1"
              >
                {card.receiver}'s Message:
              </p>
              <p
                class="text-sm text-deep-raspberry italic font-medium leading-relaxed"
              >
                "{card.replyText}"
              </p>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-slide-down {
    animation: slide-down 0.2s ease-out;
  }
</style>
