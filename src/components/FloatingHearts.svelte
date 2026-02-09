<script lang="ts">
  import { onMount } from "svelte";
  import { Motion } from "svelte-motion";

  let hearts = $state<
    {
      id: number;
      left: number;
      size: number;
      duration: number;
      delay: number;
      rotation: number;
    }[]
  >([]);

  onMount(() => {
    const heartCount = 25;
    const newHearts = Array.from({ length: heartCount }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * (35 - 12) + 12,
      duration: Math.random() * (18 - 8) + 8,
      delay: Math.random() * 8,
      rotation: Math.random() * 360,
    }));
    hearts = newHearts;
  });
</script>

<div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
  {#each hearts as heart (heart.id)}
    <Motion
      initial={{ y: "100vh", opacity: 0, rotate: heart.rotation }}
      animate={{
        y: "-20vh",
        opacity: [0, 0.7, 0.7, 0],
        rotate: heart.rotation + 360,
      }}
      transition={{
        duration: heart.duration,
        delay: heart.delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
      let:motion
    >
      <div
        use:motion
        class="absolute text-vivid-pink/20"
        style="left: {heart.left}%; font-size: {heart.size}px;"
      >
        ❤
      </div>
    </Motion>
  {/each}
</div>
