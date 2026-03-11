import { defineConfig } from "vite";
import { resolve } from "path";
import wasm from "vite-plugin-wasm";

// Packages resolved via browser importmap at runtime
const TYPST_EXTERNALS = [
  '@myriaddreamin/typst.ts',
  '@myriaddreamin/typst.ts/contrib/snippet',
  '@myriaddreamin/typst.ts/contrib/global-compiler',
  '@myriaddreamin/typst.ts/contrib/global-renderer',
  '@myriaddreamin/typst.ts/compiler',
  '@myriaddreamin/typst.ts/renderer',
  '@myriaddreamin/typst-ts-web-compiler',
  '@myriaddreamin/typst-ts-renderer',
];

export default defineConfig(({ mode }) => {
  const commonBuild = {
    outDir: 'dist',
    emptyOutDir: false,
    target: 'esnext',  // Required for top-level await in WASM modules
  };

  if (mode === 'lib') {
    return {
      plugins: [wasm()],
      optimizeDeps: { exclude: TYPST_EXTERNALS },
      build: {
        ...commonBuild,
        lib: {
          entry: resolve(__dirname, 'src/index.js'),
          name: 'MasaxTypstPDF',
          fileName: 'masax-typst-pdf',
          formats: ['es'],  // CodeMirror 6 là ESM-only, không hỗ trợ UMD global
        },
        rollupOptions: {
          external: [
            ...TYPST_EXTERNALS,
            'codemirror',
            '@codemirror/state',
            '@codemirror/view',
            'handlebars'
          ]
        }
      }
    };
  }

  if (mode === 'standalone') {
    return {
      plugins: [wasm()],
      optimizeDeps: { exclude: TYPST_EXTERNALS },
      build: {
        ...commonBuild,
        lib: {
          entry: resolve(__dirname, 'src/index.js'),
          name: 'MasaxTypstPDF',
          fileName: 'masax-typst-pdf.standalone',
          formats: ['umd']
        },
        rollupOptions: {
          external: TYPST_EXTERNALS,
        }
      }
    };
  }

  if (mode === 'full') {
    return {
      plugins: [wasm()],
      optimizeDeps: { exclude: TYPST_EXTERNALS },
      build: {
        ...commonBuild,
        lib: {
          entry: resolve(__dirname, 'src/index.js'),
          name: 'MasaxTypstPDF',
          fileName: 'masax-typst-pdf.full',
          formats: ['es']
        },
        rollupOptions: {
          external: TYPST_EXTERNALS,
        }
      }
    };
  }

  // Default (dev server)
  return {
    plugins: [wasm()],
    root: ".",
    base: "./",
    server: {
      port: 3000,
      open: true,
    },
    // Critical: tell Vite NOT to pre-bundle WASM packages
    optimizeDeps: {
      exclude: TYPST_EXTERNALS,
    },
    build: {
      ...commonBuild,
      rollupOptions: {
        external: TYPST_EXTERNALS,
      }
    }
  };
});
