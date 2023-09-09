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

	// console.log('hast: ', hast);
</script>

{#each hast.children as child}
	{#if child.type === 'element'}
		<!-- No raw text in root -->
		<Node node={child} />
	{/if}
{/each}
