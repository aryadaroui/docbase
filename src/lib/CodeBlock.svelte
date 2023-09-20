<script lang="ts">
	import { toHtml } from 'hast-util-to-html';
	import Caption from './Caption.svelte';
	import { group_by_hr } from './group_by_hr';

	export let children;
	export let prefix: string;
	export let count: string;
	export let html_id: string;
	export let class_: string = "";
	// export let counter: (name: string) => number;

	// let count = counter('code');
	// console.log('children: ', children);

	let children_grouped = group_by_hr(children, ['body', 'footer'], ['header', 'body', 'footer']);

	console.log('children_grouped: ', children_grouped);

	const body = toHtml({
		type: 'root',
		children: children_grouped.body
	});

	let caption = children_grouped.footer[0] || null;

	if (caption.tagName === 'p') {
		caption.tagName = 'span';
	}

	// console.log('caption: ', caption);

	// let html = toHtml({
	// 	type: 'root',
	// 	children
	// });
	// console.log('body: ', body);

	function copy() {
		const code_element = document.createElement('code');
		code_element.innerHTML = body;
		const pre_element = code_element.querySelector('pre');
		const code_text = pre_element.innerText;
		navigator.clipboard.writeText(code_text);
	}
</script>

<figure id={html_id} class="code-block">

	<button on:click={copy}>
		copy
	</button>

	{@html body}

	<Caption {prefix} {count} caption={caption} />
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
