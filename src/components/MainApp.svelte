<script lang="ts">
  import { AuthState } from "../lib/auth.svelte";
  import { DashboardState } from "../lib/dashboard.svelte";
  import AuthForm from "./AuthForm.svelte";
  import CreateCardForm from "./CreateCardForm.svelte";
  import StatusTracker from "./StatusTracker.svelte";

  const authState = new AuthState();

  // Reactive dashboard state to check for existing cards
  let dashboard = $derived(
    authState.user ? new DashboardState(authState.user.username) : null,
  );
</script>

<main class="max-w-4xl mx-auto min-h-screen flex flex-col justify-center py-12">
  <h1
    class="text-deep-raspberry text-5xl font-bold text-center mb-12 animate-heartbeat"
  >
    Be My Valentine
  </h1>

  <div class="grid md:grid-cols-1 gap-2 w-full">
    {#if !authState.user}
      <AuthForm {authState} />
    {:else}
      <div
        class="glass px-6 py-3 rounded-full flex justify-between items-center mb-4 max-w-md mx-auto w-full"
      >
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <p class="text-deep-raspberry text-sm font-medium">
            {authState.user.senderName}
          </p>
        </div>
        <button
          onclick={() => authState.logout()}
          class="text-xs font-bold text-vivid-pink uppercase tracking-wider hover:opacity-70 transition-opacity"
        >
          Logout
        </button>
      </div>

      {#if dashboard?.hasCard}
        <div class="glass p-8 rounded-2xl max-w-md w-full mx-auto mb-8 text-center border-vivid-pink/30">
          <p class="text-deep-raspberry font-medium">
            💖 You have crafted your one special Valentine.
          </p>
        </div>
      {:else}
        <CreateCardForm {authState} />
      {/if}
      
      <StatusTracker {authState} />
    {/if}
  </div>
</main>
