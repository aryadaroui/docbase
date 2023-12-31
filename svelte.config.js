import adapter from '@sveltejs/adapter-auto';
// import { vitePreprocess } from '@sveltejs/kit/vite';
import sveltePreprocess from 'svelte-preprocess';
import autoprefixer from 'autoprefixer';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	// preprocess: vitePreprocess(),
	preprocess: sveltePreprocess({
		scss: {
			// prependData: `@import '$lib/global.scss';`
		}
	}),
	compilerOptions: {
		customElement: true
	},

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	},

	onwarn: (warning, handler) => {
		// if (warning.code.startsWith('a11y-')) {
		// 	return;
		// }
		return; // skips handling compiler warnings
		// handler(warning); // passes compiler warnings as normal

	}
};

export default config;
