<script lang="ts">
	import Callout from './Callout.svelte';
	import Text from './Text.svelte';

	export let directive_name: string;
	export let directive_props: { [key: string]: string };
	export let directive_content: string | null;

	directive_props['directive_content'] = directive_content;

	let component_map = {
		callout: Callout,
		text: Text
	};

	console.log(directive_name);
	console.log(directive_props);
</script>

<!-- <div> -->
<!-- <p>directive!</p> -->

<svelte:component this={component_map[directive_name]} {...directive_props} />

<!-- </div> -->
