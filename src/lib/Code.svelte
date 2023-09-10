<script lang="ts">
	import { toHtml } from 'hast-util-to-html';

	export let children;
	export let counter: (name: string) => number;


	let count = counter('code');

	let html = toHtml({
		type: 'root',
		children
	});
</script>

<div class="container">
	{@html html}

	<p>Code block {count}</p>
</div>

<style lang="scss">
	.container {
		border: 1px solid red;
	}
</style>
