<script lang="ts">
  interface Props {
    receiver: string;
    title?: string | null | undefined;
  }

  let { receiver, title }: Props = $props();
</script>

<div class="flex flex-col gap-2 w-full">
  <span class="text-vivid-pink font-medium tracking-widest text-3xl">
    To: {receiver || "<Your Valentine>"}
  </span>
  <h1 class="my-4 text-5xl font-bold text-deep-raspberry">
    {title || "Will you be my Valentine?"}
  </h1>
</div>
