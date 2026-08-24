import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import MarkdownIt from 'markdown-it'

/**
 * Renders .md imports to an HTML string at build time, so the long-form essays
 * can live as editable Markdown without shipping a Markdown parser to the
 * browser.
 */
function markdown(): Plugin {
  const md = MarkdownIt({ html: true, typographer: false })
  return {
    name: 'md-to-html',
    enforce: 'pre',
    transform(src, id) {
      if (!id.endsWith('.md')) return null
      return { code: `export default ${JSON.stringify(md.render(src))}`, map: null }
    },
  }
}

export default defineConfig({
  plugins: [vue(), markdown()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  ssgOptions: {
    // /werken.html — GitHub Pages serves this at /werken with no redirect hop.
    dirStyle: 'flat',
    formatting: 'minify',
  },
})
