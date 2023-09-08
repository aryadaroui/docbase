<script lang="ts">
	import Directive from './Directive.svelte';
	import Math from './Math.svelte';
	import Code from './Code.svelte';

	export let node: Node;

	// console.log('node: ', node);

	let node_html = make_node_html(node);
	// debugger
	// console.log('node html:', node_html);

	function make_node_html(node) {
		// if (node.type === 'root') {

		// }

		if (node.type === 'text') {
			return {
				type: 'text',
				value: node.value
			};
		}

		const attributes = Object.keys(node.properties).map(
			(key) => ` ${key}="${node.properties[key]}"`
		);

		// debugger;
		const attributeString = attributes ? ` ${attributes}` : '';

		// const children = node.children.map((child) => make_node_html(child)).join('');

		return {
			type: 'element',
			opening_tag: `<${node.tagName}${attributeString}>`,
			children: node.children,
			closing_tag: `</${node.tagName}>`
		};
	}

	let attributes = {
		id: 'myId',
		class: 'myClass',
		disabled: true
	};

	// debugger;
</script>

<!-- {@html node_html.opening_tag} -->
<!-- {@html `<${node.tagName}${Object.keys(node.properties).map((key) => ` ${key}="${node.properties[key]}"`)}>`} -->
<!-- {@html `<${node.tagName}>`} -->
<!-- {#each node.children as child} -->
<!-- {#if child.type === 'text'} -->
<!-- {@html child.value} -->
<!-- {:else if child.type === 'element'} -->
<!-- <svelte:self node={child} /> -->
<!-- {:else} -->
<!-- {console.log(child)} -->
<!-- {/if} -->
<!-- {/each} -->
<!-- {@html `</${node.tagName}>`} -->
<!-- {@html node_html.closing_tag} -->

{#if node.type === 'element'}
	{#if node.tagName.startsWith('directive-')}
		<Directive props={node.properties} children={node.children} />
	{:else if node.properties && Array.isArray(node.properties.className) && node.properties.className.includes('math')}
		<Math {node} />
	<!-- {:else if node.tagName === 'code' || node.tagName === 'pre'}
		<Code {node} /> -->
	{:else}
		<svelte:element this={node.tagName} {...node.properties}>
			{#each node.children as childNode}
				<svelte:self node={childNode} />
			{/each}
		</svelte:element>
	{/if}
{:else if node.type === 'text'}
	{@html node.value}
{/if}
