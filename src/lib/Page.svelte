<script lang="ts">

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
