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



export async function load({ params }) {
	const markdown_post = fs.readFileSync('./test_data/test1.md', 'utf-8');


	const processor = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkMath)
		.use(remarkDirective)
		.use(convert_directive)
		.use(remarkRehype)
		.use(rehypeKatex)
		.use(rehypePrettyCode)
		.use(rehypeStringify);

	const hast = await processor.run(processor.parse(markdown_post));


	return { hast: hast };
}