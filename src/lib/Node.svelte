<script lang="ts">
	import Directive from './Directive.svelte';
	import Math from './Math.svelte';

	import type {Element, Text, Properties} from './types';

	// This is done because Properties by default is of type Properties | undefined
	// We can't apply the non null assertion operator because svelte will complain
	interface PropertiedElement extends Element {
		properties: Properties
	}

	export let node: PropertiedElement | Text;

	let label_counters = {
		footnote: 0,
		callout: 0,
		code: 0,
		math: 0,
		figure: 0,
		table: 0,
		chapter: 0,
		section: 0
	};

	// console.log('node: ', node);
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
