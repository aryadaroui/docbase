<script lang="ts">
	import Callout from './Callout.svelte';
	import Text from './Text.svelte';
	import Footnote from './Footnote.svelte';
	import Code from './Code.svelte';
	import type { Properties, ElementContent } from './types';

	// export let props: { [key: string]: string };

	interface DirectiveProperties extends Properties {
		name: string
	}
	
	interface ComponentMap {
		[key: string]: any // it says any, but it hsould actually be a component
	}

	export let props: Properties;
	export let children: ElementContent[];

	const directive_props = props as DirectiveProperties;

	// let nesting_level = 0;
	let { name, class: type, ...rest } = directive_props;

	let prop_pass = {
		...rest,
		type,
		children
	};

	let component_map: ComponentMap = {
		callout: Callout,
		text: Text,
		footnote: Footnote,
		code: Code
	};

</script>

<svelte:component this={component_map[directive_props.name]} {...prop_pass} />
