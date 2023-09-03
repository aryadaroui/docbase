<!-- <svelte:options customElement="docbase-callout" /> -->

<script lang="ts">
	import Test from './Test.svelte';
	// import { directive_splitter } from './directive_splitter';
	import Directive from './Directive.svelte';

	export let id: string;
	// export let callout_idx: number;
	export let type: string = 'info';
	export let collapsed: boolean = false;
	export let directive_content: string;

	function split_content(html_string: string) {
		return html_string.split('<hr>');
	}

	const parts = split_content(directive_content);
	const title = parts[0];
	const content = parts[1];

	// const content_parts = directive_splitter(content);

	console.log(directive_content);

	function toggle_collapsed() {
		collapsed = !collapsed;
		console.log(collapsed);
	}
</script>

<div {id} class="callout">
	<div class="title">
		{type}
		{@html title}
	</div>
	<hr />
	{#each content_parts as part}
		{#if part.is_directive}
			<Directive
				directive_name={part.attributes.directive_name}
				directive_props={part.attributes}
				directive_content={part.content}
			/>
		{:else}
			{@html part.content}
		{/if}
	{/each}
</div>

<style lang="scss">
	.callout {
		border: 1px solid red;
		padding: 1rem;
	}

	.title {
		font-weight: bold;
		font-size: large;

		display: flex;
		flex-direction: row;
	}

	::slotted(p) {
		margin: 0;
	}
</style>
