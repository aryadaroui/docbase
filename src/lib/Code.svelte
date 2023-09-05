<script lang="ts">
	import { unified } from 'unified';
	import rehypePrettyCode from 'rehype-pretty-code';
	import rehypeStringify from 'rehype-stringify';
	import { toHtml } from 'hast-util-to-html';

	export let node; // HAST node

	// let processor = unified()
	// 	.use(rehypePrettyCode)
	// 	.use(rehypeStringify)

	// 	let html = processor.stringify(node);

	let html = '';


	// async function run() {
	// 	html = await unified().use(rehypePrettyCode).run(node);

	// 	// console.log('code html: ', html);
	// }

	// const html = await unified().use(rehypePrettyCode).run(node);

	// console.log('code html: ', html);

	// function asdf(things: (string | number)[]) {
	// 	console.log(things);2
	// }

	// function asssdf(things: (string[] | number[])) {
	// 	console.log(things);
	// }

	// run();
</script>

{@html html}
