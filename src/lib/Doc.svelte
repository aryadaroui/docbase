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

	// import { directive_splitter } from './directive_splitter';

	import Directive from './Directive.svelte';
	import Node from './Node.svelte';

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
				if (
					node.type === 'textDirective' ||
					node.type === 'leafDirective' ||
					node.type === 'containerDirective'
				) {
					const data = {
						hName: node.name,
						hProperties: {
							...node.attributes
						}
					};
					node.data = Object.assign({}, node.data, data);
				}
			});
		};
	}

	const markdown = `

# Start Conversion test

A normal paragraph with :footnote[footnote here].

:::callout{#id}
callout header
***
callout body
***
callout footer
:::

more paragraph

# End Conversion test

`;

	const mast = remark().use(remarkGfm).use(remarkDirective).parse(markdown);

	const processor = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkDirective)
		.use(convert_directive)
		.use(remarkRehype)
		.use(rehypeStringify);

	const hast = processor.runSync(processor.parse(markdown));

	const html = processor.processSync(markdown).toString();
	console.log('mast: ', mast);
	console.log('hast: ', hast);
	// console.log('hast: ', JSON.stringify(hast, null, 3));
	// console.log(html);

	// const parts = directive_splitter(html);

	// console.log(parts);
</script>

{#each hast.children as child}
	{#if child.type === 'element'}
		<!-- No raw text in root -->
		<Node node={child} />
	{/if}
{/each}
