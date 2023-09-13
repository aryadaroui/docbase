<script lang="ts">
	// TODO: need to get this from the post info to append it to the href
	// let post_url = ''
	export let target_id: string;
	export let label: string;
	export let count: number;
</script>

<a href={'#' + target_id} class="">
	<span class="label">{label}</span>&nbsp;<span class="count">{count}</span>
</a>

<style lang="scss">
</style>
