<script lang="ts">
	import Doc from '$lib/Doc.svelte';

	export let data;

	console.log('post: ', data);
</script>

<Doc markdown={data.post} />
