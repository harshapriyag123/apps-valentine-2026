<script lang="ts">
  import { notificationState } from "../lib/notification.svelte";
  import Toast from "./Toast.svelte";
</script>

<div
  class="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none"
  aria-live="polite"
  aria-atomic="false"
>
  {#each notificationState.notifications as notification (notification.id)}
    <div class="pointer-events-auto">
      <Toast
        {notification}
        onDismiss={() => notificationState.dismiss(notification.id)}
      />
    </div>
  {/each}
</div>
