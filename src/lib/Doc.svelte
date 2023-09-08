<script lang="ts">
	import { remark } from 'remark';
	import remarkDirective from 'remark-directive';
	import remarkGfm from 'remark-gfm';
	import remarkRehype from 'remark-rehype';
	import remarkParse from 'remark-parse';
	import remarkMath from 'remark-math';
	import rehypeKatex from 'rehype-katex';
	import rehypeStringify from 'rehype-stringify';
	import { unified } from 'unified';

	import { visit } from 'unist-util-visit';
	import { h } from 'hastscript';
	import { onMount } from 'svelte';


	import Directive from './Directive.svelte';
	import Node from './Node.svelte';


	export let hast;

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

	// function capture_type() {
	// 	return (tree) => {
	// 		visit(tree, (node) => {
	// 			if (node.type === 'textDirective') {
	// 				node.type = 'leafDirective';
	// 			} else if (node.type === 'leafDirective') {
	// 				node.type = 'containerDirective';
	// 			}
	// 		});
	// 	};
	// }

	function log_node() {
		return (tree) => {
			visit(tree, (node) => {
				if (node.type === 'text') {
					node.value = node.value.replace(/:::([a-zA-Z]+):([a-zA-Z]+)/g, '$1-$2');
				}

				console.log(node);
			});
		};
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

				// if (
				// 	node.type === 'textDirective' ||
				// 	node.type === 'leafDirective' ||
				// 	node.type === 'containerDirective'
				// ) {
				// 	const data = {
				// 		hName: node.name,
				// 		hProperties: {
				// 			...node.attributes
				// 		}
				// 	};
				// 	node.data = Object.assign({}, node.data, data);
				// }
			});
		};
	}



	//  markdown = markdown.replace(/:::([a-zA-Z]+):([a-zA-Z]+)/g, '$1-$2');

	// const mast = remark().use(remarkGfm).use(remarkDirective).parse(markdown);

	const processor = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkMath)
		.use(remarkDirective)
		.use(convert_directive)
		.use(remarkRehype)
		.use(rehypeKatex)
		.use(rehypeStringify);

	// const hast = processor.runSync(processor.parse(markdown));

	// const html = processor.processSync(markdown).toString();
	// console.log('mast: ', mast);
	console.log('hast: ', hast);
	// console.log('hast: ', JSON.stringify(hast, null, 3));
	// console.log(html);

	// const parts = directive_splitter(html);

	// console.log(parts);
</script>



<!-- {@html html} -->


{#each hast.children as child}
	{#if child.type === 'element'}
		<!-- No raw text in root -->
		<Node node={child} />
	{/if}
{/each}
