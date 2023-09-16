<script lang="ts">
	// TODO: need to get this from the post info to append it to the href
	// let post_url = ''
	// export let target_html_id: string;
	export let prefix: string;
	export let count: string;
	export let html_id: string;
	export let children: any[]; // only to swallow the children prop

</script>

<a href={'#' + html_id} class="">
	<span class="label-prefix">{prefix}</span>&nbsp;<span class="label-count">{count}</span>
</a>

<style lang="scss">
</style>
