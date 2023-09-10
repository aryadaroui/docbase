<script lang="ts">
	import Page from '$lib/Page.svelte';

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
