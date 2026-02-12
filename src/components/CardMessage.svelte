<script lang="ts">
  interface Props {
    message?: string | null | undefined;
  }

  let { message }: Props = $props();
</script>

<p class="text-2xl text-deep-raspberry/80 italic leading-relaxed">
  "{message || "<Your message here>"}"
</p>
