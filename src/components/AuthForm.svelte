<script lang="ts">
  import type { AuthState } from "../lib/auth.svelte";

  interface Props {
    authState: AuthState;
  }

  let { authState }: Props = $props();

  let username = $state("");
  let senderName = $state("");

  async function handleLogin(e: SubmitEvent) {
    e.preventDefault();
    if (username.trim()) {
      await authState.login(username.trim().toLowerCase());
    }
  }

  async function handleSignup(e: SubmitEvent) {
    e.preventDefault();
    if (senderName.trim()) {
      await authState.signup(senderName.trim());
    }
  }
</script>

<div
  class="glass p-8 rounded-2xl flex flex-col gap-6 max-w-md w-full mx-auto animate-in fade-in zoom-in duration-300"
>
  {#if !authState.isSignupRequired}
    <form onsubmit={handleLogin} class="flex flex-col gap-4">
      <h2 class="text-2xl font-bold text-deep-raspberry">Welcome Back</h2>
      <p class="text-sm text-deep-raspberry/70">
        Enter your username to continue.
      </p>

      <div class="flex flex-col gap-1">
        <label for="username" class="text-sm font-medium text-deep-raspberry"
          >Username</label
        >
        <input
          type="text"
          id="username"
          bind:value={username}
          required
          placeholder="e.g. romeo123"
          class="p-2 rounded-lg bg-white/50 border border-vivid-pink/30 focus:border-vivid-pink outline-none transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={authState.loading}
        class="mt-2 bg-vivid-pink text-white font-bold py-3 rounded-xl skeuo-button disabled:opacity-50"
      >
        {authState.loading ? "Verifying..." : "Login / Join"}
      </button>
    </form>
  {:else}
    <form onsubmit={handleSignup} class="flex flex-col gap-4">
      <h2 class="text-2xl font-bold text-deep-raspberry">Nice to meet you!</h2>
      <p class="text-sm text-deep-raspberry/70">
        We couldn't find your username. Please tell us your display name to
        create an account.
      </p>

      <div class="flex flex-col gap-1">
        <label for="senderName" class="text-sm font-medium text-deep-raspberry"
          >Your Display Name</label
        >
        <input
          type="text"
          id="senderName"
          bind:value={senderName}
          required
          placeholder="e.g. Romeo Montague"
          class="p-2 rounded-lg bg-white/50 border border-vivid-pink/30 focus:border-vivid-pink outline-none transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={authState.loading}
        class="mt-2 bg-vivid-pink text-white font-bold py-3 rounded-xl skeuo-button disabled:opacity-50"
      >
        {authState.loading ? "Creating Account..." : "Complete Signup"}
      </button>

      <button
        type="button"
        onclick={() => authState.logout()}
        class="text-xs text-deep-raspberry/50 hover:underline"
      >
        Cancel
      </button>
    </form>
  {/if}

  {#if authState.error}
    <p class="text-red-600 text-sm mt-2 text-center">{authState.error}</p>
  {/if}
</div>
