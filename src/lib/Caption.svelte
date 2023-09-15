<script lang="ts">
	// maybe change `label` to `name`?
	export let prefix: string;
	export let count: number | string;
	export let caption_text: string;
</script>

<!-- svelte-ignore a11y-structure -->
<!-- it is going to be an immediate child. don't worry -->
<figcaption>
	<span class="label">{prefix}</span>&nbsp;<span class="count">{count}</span>:
	{caption_text}
</figcaption>

<style lang="scss">
</style>
