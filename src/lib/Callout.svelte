<!-- <svelte:options customElement="docbase-callout" /> -->

<script lang="ts">
	import Node from './Node.svelte';
	import { group_by_hr } from './group_by_hr';

	export let id: string;
	export let type: string = 'none';
	export let children: any[];
	export let count: string;

	let title: string;
	let body = {
		type: 'element',
		tagName: 'div',
		children: [] as any[],
		properties: {}
	};
	let groups = group_by_hr(children);

	if (groups.length >= 2) {
		title = groups[0][0].children[0].value;
		body.children = groups[1];

		if (groups.length > 2) {
			console.warn('Callout only accepts title and body');
		}
	} else {
		// console.warn('Callout requires at least a title');
		title = type;

		if (children.length === 1) {
			body.children = children;
		}
	}

	// console.log('groups: ', groups);
	// console.log('title: ', title);
	// console.log('body: ', body);

	// debugger

	// TODO: always assumes title is first child
	// decompose title / body between <hr> tags
	// default title to type if not provided

	// let title = children[0].children[0].value;

	// let body = {
	// 	type: 'element',
	// 	tagName: 'div',
	// 	children: children.slice(2),
	// 	properties: {}
	// };

	// console.log('children: ', children);
</script>

<callout>
	<div class="title">{type}: {title}</div>
	<div class="body">
		<Node node={body} />
	</div>
	<enumeration> Callout {count} </enumeration>
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
