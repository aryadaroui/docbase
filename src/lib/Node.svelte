<script lang="ts">
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

	// debugger;
</script>

<!-- {@html node_html.opening_tag} -->
<!-- {@html `<${node.tagName}${Object.keys(node.properties).map((key) => ` ${key}="${node.properties[key]}"`)}>`} -->
{@html `<${node.tagName}>`}
{#each node.children as child}
	{#if child.type === 'text'}
		{@html child.value}
	{:else if child.type === 'element'}
		<svelte:self node={child} />
	{:else}
		<!-- {console.log(child)} -->
	{/if}
{/each}
{@html `</${node.tagName}>`}
<!-- {@html node_html.closing_tag} -->
