<script lang="ts">
	import Page from '$lib/Page.svelte';
	import Custom from '$lib/Custom.svelte';
	import Cust from '$lib/Cust.svelte';

	import { setContext } from 'svelte';

	setContext('counters', {
		one: 1,
		two: 2
	});

	export let data;

	if (import.meta.hot) {
		import.meta.hot.on(
			'vite:beforeUpdate',
			/* eslint-disable-next-line no-console */
			() => console.clear()
		);
	}
</script>

<Page hast={data.hast} />

<style lang="scss">
	:global([data-highlighted-line]) {
		background-color: #ffee0063;
	}

	:global([data-highlighted-chars]) {
		background-color: #5eff0063;
	}
</style>
