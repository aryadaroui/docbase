import fs from 'fs';

// unified.js imports
import { unified } from 'unified';
import { remark } from 'remark';

import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';

import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import rehypePrettyCode from 'rehype-pretty-code';

import { visit } from 'unist-util-visit';

function log_node() {
	return (tree) => {
		visit(tree, (node) => {
			// if (node.type === 'text') {
			// 	// supposed to replace foo:bar with foo-bar
			// 	node.value = node.value.replace(/:::([a-zA-Z]+):([a-zA-Z]+)/g, '$1-$2');
			// }

			if (node.type === 'code' || node.type.startsWith('directive')) {
				console.log("log node: ", node);
			}
		});
	};
}

// function 

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

				console.log("directive before: ", node);
				const data = {
					hName: 'directive-block',
					hProperties: {
						name: node.name,
						...node.attributes
					}
				};
				node.data = Object.assign({}, node.data, data);


				if (node.children[0].type === 'code') {
					// if node.attributes.h_lines exists, then add it to the child's meta string
					let temp = '';


					if (node.attributes.h_lines) {
						// replace spaces with commas
						temp += '{' + node.attributes.h_lines.replace(/ /g, ',') + '}';
					}

					if (node.attributes.h_chars) {
						// surround each alpha string with /'s. e.g. "foo bar" -> "/foo/ /bar/"
						temp += node.attributes.h_chars.replace(/([a-zA-Z]+)/g, ' /$1/');
					}

					if (node.attributes.h_lines || node.attributes.h_chars) {
						node.children[0].meta = temp;
					}
				}

				console.log("directive after: ", node);
			}
		});
	};
}



export async function load({ params }) {
	const markdown_post = fs.readFileSync('./test_data/test1.md', 'utf-8');

	const processor = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkMath)
		.use(log_node)
		.use(remarkDirective)
		.use(convert_directive)
		.use(remarkRehype)
		.use(rehypeKatex)
		.use(rehypePrettyCode)
		.use(rehypeStringify);

	const hast = await processor.run(processor.parse(markdown_post));


	return { hast: hast };
}