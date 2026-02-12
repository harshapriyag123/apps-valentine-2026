<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import type { Notification } from "../lib/notification.svelte";

  interface Props {
    notification: Notification;
    onDismiss: () => void;
  }

  let { notification, onDismiss }: Props = $props();

  const typeStyles = {
    success: "bg-green-50 border-green-200 text-green-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
    error: "bg-red-50 border-red-200 text-red-800",
    valentine: "bg-vivid-pink/10 border-vivid-pink/30 text-deep-raspberry",
  };

  const typeIcons = {
    success: "✓",
    info: "ℹ",
    error: "✕",
    valentine: "❤️",
  };
</script>

<div
  in:fly={{ x: 300, duration: 300, easing: cubicOut }}
  out:fly={{ x: 300, duration: 200, easing: cubicOut }}
  class="flex items-start gap-3 p-4 rounded-xl border-2 shadow-lg backdrop-blur-sm max-w-sm {typeStyles[
    notification.type
  ]}"
  role="alert"
>
  <div class="flex-shrink-0 text-xl" aria-hidden="true">
    {typeIcons[notification.type]}
  </div>

  <div class="flex-1 min-w-0">
    {#if notification.title}
      <p class="font-bold text-sm mb-1">{notification.title}</p>
    {/if}
    <p class="text-sm leading-relaxed">{notification.message}</p>
  </div>

  <button
    onclick={onDismiss}
    class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors -mt-1 -mr-1"
    aria-label="Dismiss notification"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      ></path>
    </svg>
  </button>
</div>
