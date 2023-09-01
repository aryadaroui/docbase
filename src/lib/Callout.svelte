<!-- <svelte:options customElement="docbase-callout" /> -->

<script lang="ts">
	import Test from './Test.svelte';

	export let id: string;
	// export let callout_idx: number;
	export let type: string = 'info';
	export let collapsed: boolean = false;
	export let directive_content: string;

	console.log(directive_content);

	function toggle_collapsed() {
		collapsed = !collapsed;
		console.log(collapsed);
	}
</script>

<callout {id}>
	<div class="title">
		{type}
		<button on:click={toggle_collapsed}>toggle</button>
	</div>
</callout>

<style lang="scss">
	callout {
		border: 1px solid red;
		padding: 1rem;
	}

	div.title {
		font-weight: bold;
		font-size: large;

		display: flex;
		flex-direction: row;
	}

	::slotted(p) {
		margin: 0;
	}
</style>
