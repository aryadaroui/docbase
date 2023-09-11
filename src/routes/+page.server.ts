import fs from 'fs';

// unified.js imports
import { unified } from 'unified';

import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';

import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';

import { visit } from 'unist-util-visit';
import type { Root, NodeUnified, ParentUnified, DirectiveNode, CodeNode } from '$lib/types';

let label_counter = new Map<string, number>();

function log_node() {
	return (tree: ParentUnified) => {
		visit(tree, (node: NodeUnified) => {

			console.log("log node: ", node);

			// if (node.type === 'code' || node.type.startsWith('directive')) {
			// 	console.log("log node: ", node);
			// }
		});
	};
}

function count_label(directive_node: DirectiveNode) {
	const name = directive_node.name;
	const count = label_counter.get(name) || 0;
	label_counter.set(name, count + 1);

	directive_node.attributes['count'] = String(count + 1);
}

function handle_directive(directive_node: DirectiveNode) {


	count_label(directive_node);

	if (directive_node.type === 'textDirective') {

		// pass

	} else if (directive_node.type === 'leafDirective' || directive_node.type === 'containerDirective') {



		handle_code_block(directive_node);

	}

	const data = {
		hName: 'directive-block',
		hProperties: {
			name: directive_node.name,
			...directive_node.attributes
		}
	};
	directive_node.data = Object.assign({}, directive_node.data, data);

	console.log("directive_node: ", directive_node);
	console.log("label_counter: ", label_counter);
}

function handle_code_block(node: DirectiveNode) {
	let temp = ''; // temp string to store the meta string

	// if node.attributes.h_lines exists, then add it to temp
	if (node.attributes.h_lines) {
		// replace spaces with commas
		temp += '{' + node.attributes.h_lines.replace(/ /g, ',') + '}';
	}

	// if node.attributes.h_chars exists, then add it to temp
	if (node.attributes.h_chars) {
		// surround each alpha string with /'s. e.g. "foo bar" -> "/foo/ /bar/"
		temp += node.attributes.h_chars.replace(/([a-zA-Z]+)/g, ' /$1/');
	}

	// IF .h_start or h_end exists
	// AND the node's first child is a code block
	// THEN set the code block's meta = temp
	if ((node.attributes.h_lines || node.attributes.h_chars) && node.children[0].type === 'code') {
		const code_node = node.children[0] as CodeNode;
		code_node.meta = temp;
	}
}

function convert_directive() {
	return (tree: ParentUnified) => {
		visit(tree, (node: NodeUnified) => {


			if (node.type === 'textDirective' || node.type === 'leafDirective' || node.type === 'containerDirective') {
				const directive_node = node as DirectiveNode;
				handle_directive(directive_node);
			}

			// if (node.type === 'textDirective') {
			// 	const directive_node = node as DirectiveNode;

			// 	const data = {
			// 		hName: 'directive-inline',
			// 		hProperties: {
			// 			name: directive_node.name,
			// 			...directive_node.attributes
			// 		}
			// 	};
			// 	directive_node.data = Object.assign({}, directive_node.data, data);

			// } else if (node.type === 'leafDirective' || node.type === 'containerDirective') {
			// 	const directive_node = node as DirectiveNode;

			// 	const data = {
			// 		hName: 'directive-block',
			// 		hProperties: {
			// 			name: directive_node.name,
			// 			...directive_node.attributes
			// 		}
			// 	};
			// 	directive_node.data = Object.assign({}, node.data, data);

			// 	handle_code_block(directive_node);

			// }
		});
	};
}

// To be very clear, the HTML should be stored too.

export async function load() {
	const markdown_post = fs.readFileSync('./test_data/test1.md', 'utf-8');
	label_counter.clear(); // init label counter

	// i don't know why the unified.js typing is messed up here
	// cannot find a reasonable example online either
	const processor = unified()
		// @ts-ignore
		.use(remarkParse)
		// @ts-ignore
		.use(remarkGfm)
		// @ts-ignore
		.use(remarkMath)
		// .use(log_node)
		// @ts-ignore
		.use(remarkDirective)
		.use(convert_directive)
		// @ts-ignore
		.use(remarkRehype)
		// @ts-ignore
		.use(rehypeKatex)
		.use(rehypePrettyCode);
	// .use(rehypeStringify);

	// @ts-ignore
	const hast: Root = await processor.run(processor.parse(markdown_post));

	label_counter.clear(); // reset label counter
	return { hast: hast };
}