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

// import { visit } from 'unist-util-visit';
import type { Root } from '$lib/types';
import { prefix_counter, heading_counter, visit_directives, prep_labels, enumerate_headings } from './remark_plugins';



const pretty_code_options: import('rehype-pretty-code').Options = {
	theme: 'rose-pine-moon',
	keepBackground: false,
};

// To be very clear, the HTML should be stored too.

export async function load() {
	const markdown_post = fs.readFileSync('./test_data/test1.md', 'utf-8');
	prefix_counter.clear(); // init prefix counter
	heading_counter.clear(); // init heading counter

	// the field `file_body` contains the rest of the markdown file
	const frontmatter = safeLoadFront(markdown_post, { contentKeyName: 'file_body' });

	// i don't know why the unified.js typing is messed up here
	// cannot find a reasonable example online either
	const processor = unified()
		// @ts-ignore
		.use(remarkParse)
		// @ts-ignore
		.use(remarkGfm)
		// @ts-ignore
		.use(remarkMath)
		// @ts-ignore
		.use(remarkDirective)
		.use(enumerate_headings)
		.use(prep_labels)
		.use(visit_directives)
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
	prefix_counter.clear(); 
	heading_counter.clear();
	return {
		title: frontmatter.title,
		body: body
	};
}