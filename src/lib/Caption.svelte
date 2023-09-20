<script lang="ts">
	import Node from "./Node.svelte";

	// maybe change `label` to `name`?
	export let prefix: string;
	export let count: number | string;
	export let caption;
</script>

<!-- svelte-ignore a11y-structure -->
<!-- it is going to be an immediate child. don't worry -->
<figcaption>
	<span class="label">{prefix}</span>&nbsp;<span class="count">{count}</span>: <Node node={caption} />
</figcaption>

<style lang="scss">

	.label {
		font-weight: bold;
	}

	.count {
		font-weight: bold;
	}
</style>
