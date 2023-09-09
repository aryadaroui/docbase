<script lang="ts">
	import Directive from './Directive.svelte';
	import Math from './Math.svelte';

	export let node: Node;
</script>

{#if node.type === 'element'}
	{#if node.tagName.startsWith('directive-')}
		<Directive props={node.properties} children={node.children} />
	{:else if node.properties && Array.isArray(node.properties.className) && node.properties.className.includes('math')}
		<Math {node} />
		<!-- {:else if node.tagName === 'code' || node.tagName === 'pre'}
		<Code {node} /> -->
	{:else}
		<svelte:element this={node.tagName} {...node.properties}>
			{#each node.children as childNode}
				<svelte:self node={childNode} />
			{/each}
		</svelte:element>
	{/if}
{:else if node.type === 'text'}
	{@html node.value}
{/if}
