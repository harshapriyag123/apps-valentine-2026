<script lang="ts">
  import { AuthState } from '../lib/auth.svelte';
  import AuthForm from './AuthForm.svelte';
  import CreateCardForm from './CreateCardForm.svelte';
  import StatusTracker from './StatusTracker.svelte';

  const authState = new AuthState();
</script>

<main class="max-w-4xl mx-auto">
  <h1 class="text-deep-raspberry text-5xl font-bold text-center mb-12 animate-heartbeat">
    Be My Valentine
  </h1>

  <div class="grid md:grid-cols-1 gap-8">
    {#if !authState.user}
      <AuthForm {authState} />
    {:else}
      <div class="flex flex-col gap-4 items-center mb-8">
        <p class="text-deep-raspberry font-medium">Logged in as: <span class="font-bold">{authState.user.senderName}</span> (@{authState.user.username})</p>
        <button 
          onclick={() => authState.logout()}
          class="text-xs text-vivid-pink hover:underline"
        >
          Logout
        </button>
      </div>
      
      <CreateCardForm {authState} />
      <StatusTracker />
    {/if}
  </div>
</main>