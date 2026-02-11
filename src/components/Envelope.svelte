<script lang="ts">
  import { Motion } from "svelte-motion";

  interface Props {
    onclick: () => void;
  }

  let { onclick }: Props = $props();

  // Wiggle animation variants
  const wiggle = {
    rest: { rotate: 0, scale: 1 },
    hover: {
      rotate: [0, -2, 2, -2, 2, 0],
      scale: 1.05,
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "loop" as const, // Type assertion for Motion
      },
    },
    tap: { scale: 0.95 },
  };
</script>

<div class="flex justify-center items-center w-full h-full py-10 cursor-pointer">
  <Motion
    initial="rest"
    whileHover="hover"
    whileTap="tap"
    variants={wiggle}
    let:motion
  >
    <!-- Accessible button wrapper for the SVG -->
    <button
      use:motion
      {onclick}
      class="relative w-64 h-48 focus:outline-none group"
      aria-label="Open Valentine's Envelope"
    >
      <!-- Envelope Body (SVG) -->
      <svg
        viewBox="0 0 300 200"
        class="w-full h-full drop-shadow-xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Back Flap -->
        <path d="M10 10 L150 110 L290 10 V190 H10 V10 Z" fill="#FCE7F3" stroke="#DB2777" stroke-width="2" />
        
        <!-- Bottom Flap -->
        <path d="M10 190 L150 100 L290 190 H10 Z" fill="#FBCFE8" stroke="#DB2777" stroke-width="2" />
        
        <!-- Top Flap (Closed) -->
        <path d="M10 10 L150 110 L290 10" fill="#F9A8D4" stroke="#DB2777" stroke-width="2" />
        
        <!-- Heart Seal -->
        <circle cx="150" cy="110" r="15" fill="#BE185D" />
      </svg>
      
      <div class="absolute -bottom-8 left-0 right-0 text-center">
        <span class="font-dancing text-2xl text-deep-raspberry animate-pulse">
            Tap to Open
        </span>
      </div>
    </button>
  </Motion>
</div>
