<script lang="ts">
	import Doc from '$lib/Doc.svelte';

	export let data;

	if (import.meta.hot) {
		import.meta.hot.on(
			'vite:beforeUpdate',
			/* eslint-disable-next-line no-console */
			() => console.clear()
		);
	}
</script>

<Doc hast={data.hast} />

<style lang="scss">
	:global([data-highlighted-line]) {
		background-color: #ffee0063;
	}

	:global([data-highlighted-chars]) {
		background-color: #5eff0063;
	}
</style>
