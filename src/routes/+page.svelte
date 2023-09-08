<script lang="ts">
	import Doc from '$lib/Doc.svelte';

	export let data;

	console.log('hast: ', data);

</script>


<Doc hast={data.hast} />
