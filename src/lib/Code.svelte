<script lang="ts">
	import { toHtml } from 'hast-util-to-html';
	import Caption from './Caption.svelte';

	export let children;
	// export let counter: (name: string) => number;
	export let count;



	// let count = counter('code');

	let html = toHtml({
		type: 'root',
		children
	});
</script>

<figure class="code-block">
	{@html html}

	<Caption prefix="Code block" count={count} caption_text="caption text"></Caption>
</figure>

<style lang="scss">
	.code-block {
		border: 1px solid red;
	}
</style>
