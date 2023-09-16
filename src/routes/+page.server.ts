import fs from 'fs';

// unified.js imports
import { unified } from 'unified';

import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import { safeLoadFront } from 'yaml-front-matter';

import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';

import { visit } from 'unist-util-visit';
import type { Root, NodeUnified, ParentUnified, DirectiveNode, CodeNode } from '$lib/types';


const pretty_code_options: import('rehype-pretty-code').Options = {
	theme: 'rose-pine-moon'
};

// const prefix_counter = new Map<string, number>();

interface RefID {
	prefix: string;
	count: string;
	html_id: string;
}

const prefix_dict: { [key: string]: string; } = {
	'code': 'Code block',
	'callout': 'Callout',
};


const prefix_counter = {
	_map: new Map<string, number>(),
	get(prefix: string) {
		return this._map.get(prefix);
	},
	set(prefix: string, count: number) {
		this._map.set(prefix, count);
	},
	clear() {
		this._map.clear();
	},
	increment(prefix: string) {
		const count = this.get(prefix) || 0;
		this.set(prefix, count + 1);
	}
};


const ref_dict: { [key: string]: RefID; } = {};

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

function handle_ref(directive_node: DirectiveNode) {
	if (directive_node.name === 'ref') {

		let target = directive_node.children[0].value;
		// if target starts with a "#", then remove it
		if (target.startsWith('#')) {
			target = target.slice(1);
		}

		// check if key exists in ref_dict
		if (ref_dict[target]) {

			directive_node.attributes.prefix = ref_dict[target].prefix;
			directive_node.attributes.count = ref_dict[target].count;
			directive_node.attributes.html_id = ref_dict[target].html_id;
		} else {
			directive_node.attributes.prefix = "Error:";
			directive_node.attributes.count = "bad ref";
			directive_node.attributes.html_id = "";
		}
	}
}

function handle_labels() {
	return (tree: ParentUnified) => {
		visit(tree, (node: NodeUnified) => {
			if (node.type === 'textDirective' || node.type === 'leafDirective' || node.type === 'containerDirective') {
				const directive_node = node as DirectiveNode;

				if (!directive_node.attributes.prefix) {
					directive_node.attributes.prefix = prefix_dict[directive_node.name];
				}
				prefix_counter.increment(directive_node.attributes.prefix);
				directive_node.attributes.count = String(prefix_counter.get(directive_node.attributes.prefix));



				// set html_id to prefix + count but in hyphen-case
				directive_node.attributes.html_id = (directive_node.attributes.prefix + '-' + directive_node.attributes.count).toLowerCase().replace(/ /g, '-');

				// handle ref_id if provided id
				if (directive_node.attributes.id) {
					// directive_node.attributes.ref_id = directive_node.attributes.id;
					ref_dict[directive_node.attributes.id] = {
						prefix: directive_node.attributes.prefix,
						count: directive_node.attributes.count,
						html_id: directive_node.attributes.html_id
					};
					delete directive_node.attributes.id;
				}
			}
		});
	};
}

function handle_directive(directive_node: DirectiveNode) {

	// remove name attribute if it exists
	// this is because the name is already stored in directive_node.name
	// we rely on that to dynamically generate the svelte component
	if (directive_node.attributes.name) {
		delete directive_node.attributes.name;
	}

	// count_prefix(directive_node);

	if (directive_node.type === 'textDirective') {

		handle_ref(directive_node);

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

	// console.log("directive_node: ", directive_node);
	// console.log("prefix_counter: ", prefix_counter);
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

	// remove h_lines and h_chars from node.attributes if they exist
	if (node.attributes.h_lines) {
		delete node.attributes.h_lines;
	}
	if (node.attributes.h_chars) {
		delete node.attributes.h_chars;
	}

	// console.log("code block: ", node);
}

function convert_directive() {
	return (tree: ParentUnified) => {
		visit(tree, (node: NodeUnified) => {


			if (node.type === 'textDirective' || node.type === 'leafDirective' || node.type === 'containerDirective') {
				const directive_node = node as DirectiveNode;
				handle_directive(directive_node);
			}
		});
	};
}


// To be very clear, the HTML should be stored too.

export async function load() {
	const markdown_post = fs.readFileSync('./test_data/test1.md', 'utf-8');
	prefix_counter.clear(); // init prefix counter

	// the field `file_body` contains the rest of the markdown file
	const frontmatter = safeLoadFront(markdown_post, { contentKeyName: 'file_body' });

	// i don't know why the unified.js typing is messed up here
	// cannot find a reasonable example online either
	const processor = unified()
		// .use(log_node)
		// @ts-ignore
		.use(remarkParse)
		// @ts-ignore
		.use(remarkGfm)
		// @ts-ignore
		.use(remarkMath)
		// @ts-ignore
		.use(remarkDirective)
		.use(handle_labels)
		.use(convert_directive)
		// @ts-ignore
		.use(remarkRehype)
		// @ts-ignore
		.use(rehypeKatex)
		.use(rehypePrettyCode, pretty_code_options);
	// TS is confused about the return of .run(), it *is* a promise;
	// the await is needed!
	// @ts-ignore
	const body: Root = await processor.run(processor.parse(frontmatter.file_body));

	// console.log("frontmatter: ", String(frontmatter));
	// console.log("hast: ", body);
	prefix_counter.clear(); // reset prefix counter
	return {
		title: frontmatter.title,
		body: body
	};
}