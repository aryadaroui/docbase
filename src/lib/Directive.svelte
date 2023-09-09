<script lang="ts">
	import Callout from './Callout.svelte';
	import Text from './Text.svelte';
	import Footnote from './Footnote.svelte';
	import Code from './Code.svelte';

	export let props: { [key: string]: string };
	export let children: any[];

	// let nesting_level = 0;
	let { name, class: type, ...rest } = props;

	let prop_pass = {
		...rest,
		type,
		children
	};

	let component_map = {
		callout: Callout,
		text: Text,
		footnote: Footnote,
		code: Code
	};

	// console.log(props);
</script>

<!-- <div> -->
<!-- <p>directive!</p> -->

<svelte:component this={component_map[props.name]} {...prop_pass} />

<!-- </div> -->
