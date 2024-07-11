import { defineConfig } from 'vite'
import { resolve } from 'path'
import { globby } from 'globby'

import { createHtmlPlugin } from 'vite-plugin-html'

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
  // console.log("WE WORKIN HERE");
  const files = await globby('**/*.html', { cwd: rootDir });
  // console.log(files);
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
    // name = name.replace(/\//g, '_');
    // console.log('name', name);
    inputs[name] = resolve(rootDir, file);
  }
  return inputs;
}

export default defineConfig(async ({ command, mode }) => {
  const inputs = await resolveInputs(__dirname);
  return {
    plugins: [
      createHtmlPlugin({
        minify: true,
      }),
    ],
    base: '',
    build: {
      assetsDir: 'static',
      cssMinify: 'lightningcss',
      rollupOptions: {
        input: inputs, 
      }
    },
    appType: 'mpa',
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
    server: {
      watch: {
        ignored: ["**/.direnv/**"],
      },
    },
  }
})
// vim: set ts=2 sw=2 et:
