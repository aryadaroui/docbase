<svelte:options customElement="custom-element" accessors={false} />

<script lang="ts">
	import { getContext } from "svelte";

	const counters = getContext("counters");

	console.log("counters: ", counters);

	export let some_data;
	export let count;
</script>

<p>
	Custom element. some data: {some_data}!
	<slot />
</p>
