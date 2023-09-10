<script lang="ts">

	import Node from './Node.svelte';
	import type { Root, Element } from './types';

	export let hast: Root;

	// console.log('hast: ', hast);
</script>

<!-- No raw text in root -->
{#each hast.children as child}
	{#if child.type === 'element'}
	<!-- child is of type Element -->
		<Node node={child} />
	{/if}
{/each}
