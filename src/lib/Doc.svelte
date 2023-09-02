<script lang="ts">
	import { remark } from 'remark';
	import remarkDirective from 'remark-directive';
	import remarkGfm from 'remark-gfm';
	import remarkRehype from 'remark-rehype';
	import remarkParse from 'remark-parse';
	import rehypeStringify from 'rehype-stringify';
	import { unified } from 'unified';

	import { visit } from 'unist-util-visit';
	import { h } from 'hastscript';
	import { onMount } from 'svelte';

	import { directive_splitter } from './directive_splitter';

	import Directive from './Directive.svelte';

	// customElements.define('docbase-callout', Callout.element);

	// let directive_count = 0;
	// let directive_list = [];

	function split_args(node) {
		const aboveChildren = [];
		const belowChildren = [];
		let above = true;

		node.children.forEach((child) => {
			if (child.type === 'thematicBreak') {
				above = false;
				return;
			}

			if (above) {
				aboveChildren.push(child);
			} else {
				belowChildren.push(child);
			}
		});

		const aboveNode = {
			type: 'div',
			attributes: { slot: 'arg0' },
			data: { hProperties: { slot: 'arg0' } },
			children: aboveChildren
		};
		const belowNode = {
			type: 'div',
			attributes: { slot: 'arg1' },
			data: { hProperties: { slot: 'arg1' } },
			children: belowChildren
		};

		node.children = [aboveNode, belowNode];
	}

	function convert_directive() {
		return (tree) => {
			visit(tree, (node) => {
				if (node.type === 'textDirective') {
					const data = {
						hName: 'directive-inline',
						hProperties: {
							name: node.name,
							...node.attributes
						}
					};
					node.data = Object.assign({}, node.data, data);
				} else if (node.type === 'leafDirective' || node.type === 'containerDirective') {
					const data = {
						hName: 'directive-block',
						hProperties: {
							name: node.name,
							...node.attributes
						}
					};
					node.data = Object.assign({}, node.data, data);
				}
			});
		};
	}

	const markdown = `

# Conversion test

A normal paragraph.

:::callout{#callout_id type=warning collapsed=true }
Callout title
***
Callout content :text[text directive]{#text_id}.
:::

more paragraph

`;

	const ast = remark().use(remarkGfm).use(remarkDirective).parse(markdown);

	const processor = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkDirective)
		.use(convert_directive)
		.use(remarkRehype)
		.use(rehypeStringify);

	const html = processor.processSync(markdown).toString();
	// console.log(ast);
	console.log(html);

	const parts = directive_splitter(html);

	// console.log(parts);
</script>

<!-- {@html html} -->

<!-- {#each parts as part}
	{#if part.is_directive}
		<Directive
			directive_name={part.attributes.directive_name}
			directive_props={part.attributes}
			directive_content={part.content}
		/>
	{:else}
		{@html part.content}
	{/if}
{/each} -->
