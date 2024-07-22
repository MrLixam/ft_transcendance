import { defineConfig } from 'vite'
import { resolve } from 'path'
import { globby } from 'globby'

import { ViteMinifyPlugin } from 'vite-plugin-minify'

/**
 * Resolve all entry '.html' files recursively in the project
 *
 * @param {string} rootDir
 *
 * @returns {Record<string, string>}
 */
async function resolveInputs(rootDir) {
  const inputs = {};
  const ignoredDirs = ['dist', 'public', 'static', 'node_modules', '.git'];
  const files = await globby('**/*.html', { cwd: rootDir });
  for (const file of files) {
    let process = true;
    for (const dir of ignoredDirs) {
      if (file.startsWith(dir)) {
        process = false;
        break;
      }
    }
    if (!process) {
      continue;
    }
    let name = file.replace(/\.html$/, '');
    name = name.replace(/\//g, '_');
    inputs[name] = resolve(rootDir, file);
  }
  return inputs;
}

export default defineConfig(async ({ _, __ }) => {
  const inputs = await resolveInputs(__dirname);
  return {
    appType: 'mpa', // tkt
    plugins: [
      ViteMinifyPlugin({}),
    ],
    base: '',
    build: {
      assetsDir: 'static',
      cssMinify: 'lightningcss',
      rollupOptions: {
        input: inputs, 
      }
    },
    css: {
      transformer: 'postcss',
      loaderOptions: {
        sass: {
          sassOptions: {
            quietDeps: true,
          },
        },
      },
    },
    resolve: {
      alias: {
        '~': __dirname,
      },
    },
    server: {
      watch: {
        ignored: ["**/.direnv/**", "**/node_modules/**", "**/.git/**", "**/dist/**"],
      },
    },
  }
})
// vim: set ts=2 sw=2 et:
