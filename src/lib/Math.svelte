<script lang="ts">
 import {toHtml} from 'hast-util-to-html';

	export let node; // HAST node
	// console.log('node: ', node);

	// console.log(toHtml(node));
</script>


{@html toHtml(node)}