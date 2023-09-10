<script lang="ts">
	import Callout from './Callout.svelte';
	import Text from './Text.svelte';
	import Footnote from './Footnote.svelte';
	import Code from './Code.svelte';

	export let props: { [key: string]: string };
	export let children: any[];
	export let counter: (name: string) => number;

	// let nesting_level = 0;
	let { name, class: type, ...rest } = props;

	let prop_pass = {
		...rest,
		type,
		children,
		counter
	};

	let component_map = {
		callout: Callout,
		text: Text,
		footnote: Footnote,
		code: Code
	};


	// console.log(props);
</script>

<svelte:component this={component_map[props.name]} {...prop_pass} />
