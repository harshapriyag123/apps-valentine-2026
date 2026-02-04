<script lang="ts">
  import { AuthState } from "../lib/auth.svelte";
  import AuthForm from "./AuthForm.svelte";
  import CreateCardForm from "./CreateCardForm.svelte";
  import StatusTracker from "./StatusTracker.svelte";

  const authState = new AuthState();
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

      <CreateCardForm {authState} />
      <StatusTracker {authState} />
    {/if}
  </div>
</main>
