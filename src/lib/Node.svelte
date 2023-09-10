<script lang="ts">
	import Directive from './Directive.svelte';
	import Math from './Math.svelte';

	export let node;

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

	function count_label(name: string) {
		console.log('counting label: ', name);
		console.log('start count: ', label_counters[name]);
		// debugger;
		label_counters[name] = label_counters[name] + 1;
		console.log('end count: ', label_counters[name]);
		return label_counters[name];
	}
</script>

{#if node.type === 'element'}
	{#if node.tagName.startsWith('directive-')}
		<Directive props={node.properties} children={node.children} counter={count_label}/>
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
