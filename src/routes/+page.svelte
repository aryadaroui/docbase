<script lang="ts">
	import Page from '$lib/Page.svelte';
	// import Custom from '$lib/Custom.svelte';
	// import Cust from '$lib/Cust.svelte';

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

	console.log('data: ', data);
	// let html = `<custom-element some_data="hello world" count="1.1">slotted data</custom-element>`;
</script>

<!-- {@html html} -->

<!-- <custom-element some_data="goodbye world" count="2.2">other data</custom-element> -->
<!-- <Cust /> -->

<Page hast={data.body} />
