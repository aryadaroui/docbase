<script lang="ts">
	import Node from './Node.svelte';

	export let id: string;
	export let children: any[];

	console.log('children: ', children);

	// console.log('children: ', children);
</script>

*<footnote>
	[{children[0].value}]
</footnote>

<style lang="scss">
	footnote {
		display: inline-block;
	}
</style>
