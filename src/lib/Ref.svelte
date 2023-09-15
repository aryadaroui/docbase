<script lang="ts">
	// TODO: need to get this from the post info to append it to the href
	// let post_url = ''
	// export let target_html_id: string;
	export let prefix: string;
	export let count: number;


	function make_html_id(prefix: string, count: number): string {
		return dashify(prefix) + "-" + count;
	}

	let html_id = make_html_id(prefix, count);

</script>

<a href={'#' + html_id} class="">
	<span class="label-prefix">{prefix}</span>&nbsp;<span class="label-count">{count}</span>
</a>

<style lang="scss">
</style>
