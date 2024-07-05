import { defineConfig } from '@rsbuild/core';
import { pluginImageCompress } from '@rsbuild/plugin-image-compress';
import { pluginLightningcss } from '@rsbuild/plugin-lightningcss';
import { pluginSass } from '@rsbuild/plugin-sass';

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
	experiments: {
		rspackFuture: {
			newTreeshaking: true,
		},
		lazyCompilation: isDev,
	},
	html: {
		template: "src/index.html",
	},
	plugins: [
		pluginSass(),
		pluginImageCompress(),
		pluginLightningcss(),
	],
});
