<!-- <svelte:options customElement="docbase-callout" /> -->

<script lang="ts">
	import Node from './Node.svelte';

	export let id: string;
	export let type: string = 'info';
	export let children: any[];


	// TODO: always assumes title is first child
	// decompose title / body between <hr> tags
	// default title to type if not provided

	let title = children[0].children[0].value;

	let body = {
		type: 'element',
		tagName: 'div',
		children: children.slice(2),
		properties: {}
	};

	// console.log('children: ', children);
</script>

<callout>
	<div class="title">{type}: {title}</div>
	<div class="body">
		<Node node={body} />
	</div>
	<enumeration>
		Callout 1
	</enumeration>
</callout>

<style lang="scss">
	callout {
		display: block;
		border: 1px solid black;
		padding: 1em;
	}

	.title {
		font-weight: bold;
		font-size: large;
	}
</style>
