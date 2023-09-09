<script lang="ts">
	import { toHtml } from 'hast-util-to-html';

	export let children;


	let html = toHtml({
		type: 'root',
		children
	});
</script>

<div class="container">
	{@html html}
</div>

<style lang="scss">
	.container {
		border: 1px solid red;
	}
</style>
