<script lang="ts">
	import { toHtml } from 'hast-util-to-html';
	import Caption from './Caption.svelte';

	export let children;
	export let prefix: string;
	export let count: string;
	export let html_id: string;
	// export let counter: (name: string) => number;

	// let count = counter('code');

	let html = toHtml({
		type: 'root',
		children
	});
</script>

<figure id={html_id} class="code-block">
	{@html html}

	<Caption {prefix} {count} caption_text="caption text" />
</figure>

<style lang="scss">
	.code-block {
		display: block;
		border: 1px solid black;
		padding: 1em;
		// width: 100%;
		margin: 1em 0;
	}
</style>
