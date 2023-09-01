import { remark } from "remark";
import remarkDirective from "remark-directive";
import remarkRehype from "remark-rehype";
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";

import { visit } from 'unist-util-visit';
import { h } from 'hastscript';

import { JSDOM } from 'jsdom';


let directive_count = 0;
let directive_list = [];

function convert_directive() {
	return (tree) => {
		visit(tree, (node) => {
			if (
				node.type === 'textDirective' ||
				node.type === 'leafDirective' ||
				node.type === 'containerDirective'
			) {
				directive_list.push(h(node.name, node.attributes, node.children));

				const data = {
					hName: 'directive',
					hProperties: {
						...node.attributes,
						directive_name: node.name,
						directive_idx: directive_count
					}
				};

				// const data = {
				// 	hName: node.name,
				// 	hProperties: { ...node.attributes, directive_idx: directive_count},
				// };
				node.data = Object.assign({}, node.data, data);
				directive_count++;
			}
		});
	};
}

function split_html_string(html) {
	const regex = /(<directive.*?>.*?<\/directive>)/gs;
	let html_list = html.split(regex).filter((str) => str.trim() !== '');

	return html_list.map(str => {
		if (str.startsWith('<directive')) {

			const dom = new JSDOM(str);
			const directive = dom.window.document.querySelector('directive');
			let attributes = {};

			for (let i = 0; i < directive.attributes.length; i++) {
				attributes[directive.attributes[i].name] = directive.attributes[i].value;
			}

			console.log(attributes);

			return {
				is_directive: true,
				attributes: attributes,
				content: directive.innerHTML
			}
		}
		return {
			is_directive: false,
			content: str
		}
	})
}



const markdown = `
# Conversion test

A normal paragraph.

:::callout{#callout_id type=warning title="This is a warning!" collapsed=true }

Callout content. :text[text]!

---

Callout caption.
:::

more paragraph
`;

const ast = remark().use(remarkDirective).parse(markdown);

const processor = unified()
	.use(remarkParse)
	.use(remarkDirective)
	.use(convert_directive)
	.use(remarkRehype)
	.use(rehypeStringify);

const html = processor.processSync(markdown).toString();

console.log(html);
console.log(split_html_string(html));


console.log("done");