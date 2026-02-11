<script lang="ts">
  import { Motion } from "svelte-motion";
  import { AuthState } from "../lib/auth.svelte";
  import { DashboardState } from "../lib/dashboard.svelte";
  import { uiState } from "../lib/ui.svelte";
  import AuthForm from "./AuthForm.svelte";
  import CreateCardForm from "./CreateCardForm.svelte";
  import ShareModal from "./ShareModal.svelte";
  import StatusTracker from "./StatusTracker.svelte";

  const authState = new AuthState();

  // Reactive dashboard state to check for existing cards
  let dashboard = $derived(
    authState.user ? new DashboardState(authState.user.username) : null,
  );

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
</script>

<Motion
  initial="hidden"
  animate="visible"
  variants={containerVariants}
  let:motion
>
  <main
    use:motion
    class="max-w-4xl mx-auto min-h-screen flex flex-col justify-center py-12 overflow-x-hidden"
  >
    <Motion variants={itemVariants} let:motion>
      <h1
        use:motion
        class="text-deep-raspberry text-5xl font-bold text-center mb-12 animate-heartbeat"
      >
        Be My Valentine
      </h1>
    </Motion>

    <div class="grid md:grid-cols-1 gap-2 w-full">
      {#if !authState.user}
        <Motion variants={itemVariants} let:motion>
          <div use:motion>
            <AuthForm {authState} />
          </div>
        </Motion>
      {:else}
        <Motion variants={itemVariants} let:motion>
          <div
            use:motion
            class="glass px-6 py-3 rounded-full flex justify-between items-center mb-4 max-w-md mx-auto w-full"
          >
            <div class="flex items-center gap-2">
              <div
                class="w-2 h-2 bg-green-500 rounded-full animate-pulse"
              ></div>
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
        </Motion>

        {#if dashboard?.hasCard}
          <Motion variants={itemVariants} let:motion>
            <div
              use:motion
              class="glass p-8 rounded-2xl max-w-md w-full mx-auto mb-8 text-center border-vivid-pink/30"
            >
              <p class="text-deep-raspberry font-medium">
                💖 You have crafted your one special Valentine.
              </p>
            </div>
          </Motion>
        {:else}
          <Motion variants={itemVariants} let:motion>
            <div use:motion>
              <CreateCardForm {authState} />
            </div>
          </Motion>
        {/if}

        {#if dashboard?.hasCard}
          <Motion variants={itemVariants} let:motion>
            <div use:motion>
              <StatusTracker {authState} />
            </div>
          </Motion>
        {/if}
      {/if}
    </div>
  </main>
</Motion>

<ShareModal
  url={uiState.shareModalUrl}
  isOpen={uiState.isShareModalOpen}
  onClose={() => uiState.closeShareModal()}
/>
