<script lang="ts">
  import { Motion } from "svelte-motion";

  interface Props {
    onclick: () => void;
    open?: boolean; // New prop to trigger opening animation
  }

  let { onclick, open = false }: Props = $props();

  // Wiggle animation variants
  const wiggle = {
    rest: { rotate: 0, scale: 1 },
    hover: {
      rotate: [0, -2, 2, -2, 2, 0],
      scale: 1.05,
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "loop" as const, 
      },
    },
    tap: { scale: 0.95 },
  };

  // Flap animation
  // Closed: M10 10 L150 110 L290 10
  // Open: M10 10 L150 -90 L290 10 (flipped up)
</script>

<div class="flex justify-center items-center w-full h-full py-10 cursor-pointer">
  <Motion
    initial="rest"
    whileHover={open ? undefined : "hover"}
    whileTap={open ? undefined : "tap"}
    animate={open ? { scale: 1.1, y: 20 } : "rest"}
    variants={wiggle}
    let:motion
  >
    <!-- Accessible button wrapper for the SVG -->
    <button
      use:motion
      {onclick}
      class="relative w-64 h-48 focus:outline-none group"
      aria-label="Open Valentine's Envelope"
      disabled={open}
    >
      <!-- Envelope Body (SVG) -->
      <svg
        viewBox="0 0 300 200"
        class="w-full h-full drop-shadow-2xl overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Back of Envelope -->
        <rect x="10" y="40" width="280" height="150" rx="20" fill="#FFF1F2" stroke="#FDA4AF" stroke-width="2" />

        <!-- Card Inside (Sliding up) -->
         <Motion 
            initial={{ y: 0, opacity: 0 }}
            animate={open ? { y: -80, opacity: 1 } : { y: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            let:motion={cardMotion}
         >
            <rect use:cardMotion x="25" y="50" width="250" height="130" fill="white" stroke="#FECDD3" rx="12" />
         </Motion>

        <!-- Side Flaps (Internal folds) -->
        <path d="M10 40 L130 115 C140 120 160 120 170 115 L290 40" stroke="#FDA4AF" stroke-width="1" opacity="0.3" />

        <!-- Side Flap Left -->
        <path d="M10 40 L140 115 L10 190 Z" fill="#FFF5F7" stroke="#FDA4AF" stroke-width="1" />
        
        <!-- Side Flap Right -->
        <path d="M290 40 L160 115 L290 190 Z" fill="#FFF5F7" stroke="#FDA4AF" stroke-width="1" />

        <!-- Bottom Flap (Rounded Triangle) -->
        <path d="M10 190 C10 190 120 100 140 100 C160 100 290 190 290 190 Z" fill="#FFE4E6" stroke="#FDA4AF" stroke-width="2" />
        
        <!-- Top Flap (Animating) -->
        <Motion
            initial={{ d: "M10 40 C10 40 120 140 150 140 C180 140 290 40 290 40 Z" }}
            animate={open ? { d: "M10 40 C10 40 120 -40 150 -40 C180 -40 290 40 290 40 Z" } : { d: "M10 40 C10 40 120 140 150 140 C180 140 290 40 290 40 Z" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            let:motion={flapMotion}
        >
             <path use:flapMotion d="M10 40 C10 40 120 140 150 140 C180 140 290 40 290 40 Z" fill="#FECDD3" stroke="#FB7185" stroke-width="2" />
        </Motion>

        <!-- Heart Seal -->
        <Motion
            initial={{ opacity: 1, scale: 1, x: 132, y: 115 }}
            animate={open ? { opacity: 0, scale: 0, x: 132, y: 95 } : { opacity: 1, scale: 1, x: 132, y: 115 }}
            transition={{ duration: 0.4 }}
            let:motion={sealMotion}
        >
             <g use:sealMotion>
                <path d="M18 33.06l-.21-.09-.66-.36c-4.98-2.58-12.18-6.75-12.18-14.22 0-5.76 4.86-10.35 10.71-10.35 2.88 0 5.58 1.26 7.38 3.42 1.8-2.16 4.5-3.42 7.38-3.42 5.85 0 10.71 4.59 10.71 10.35 0 7.47-7.2 11.64-12.18 14.16l-.66.36-.21.09a2.256 2.256 0 01-2.1 0z" fill="#E11D48" stroke="#9F1239" stroke-width="1" />
                <path d="M12 12 C12 12 10 14 10 16" stroke="white" stroke-width="1.5" stroke-linecap="round" opacity="0.4" />
             </g>
        </Motion>
      </svg>
      
      <div class="absolute -bottom-8 left-0 right-0 text-center">
        <span class="font-dancing text-2xl text-deep-raspberry {open ? 'opacity-0' : 'animate-pulse'} transition-opacity duration-500">
            Tap to Open
        </span>
      </div>
    </button>
  </Motion>
</div>
