<svelte:options customElement="docbase-callout" />

<script lang="ts">

	import Test from "./Test.svelte";

	export let type: string = 'info';
	export let collapsed: boolean = false;

	function toggle_collapsed() {
		collapsed = !collapsed;
		console.log(collapsed);
	}
</script>

<div class="callout">

	<Test test_val="test" />

	<button on:click={toggle_collapsed}>click</button>
	<div class="callout-title">
		<div>{type}!</div>
		<div><slot name="arg0" /></div>
	</div>

	<hr />
	<slot name="arg1" />
</div>

<style lang="scss">
	.callout {
		border: 1px solid red;
		padding: 1rem;
	}

	div.callout-title {
		font-weight: bold;
		font-size: large;

		display: flex;
		flex-direction: row;
	}

	::slotted(p) {
		margin: 0;
	}
</style>
