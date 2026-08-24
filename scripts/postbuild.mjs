/**
 * Post-build steps that need the finished dist/ tree.
 *
 *  1. Removes Vite's SSR manifest, which vite-ssg needs during the render pass
 *     but which would otherwise be published alongside the site.
 *  2. Writes a stub at every URL the old site served. GitHub Pages cannot issue
 *     a 301, so each stub carries rel=canonical plus a meta refresh, and a plain
 *     link for anyone arriving without JavaScript.
 *  3. Preserves the exhibition programme at its original path.
 *  4. Generates sitemap.xml.
 *
 * The 404 page is not written here — it is a real pre-rendered route, so an
 * unknown path gets a page that says so rather than the home page's content
 * under a 404 status.
 */
import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const DIST = join(ROOT, 'dist')
const SITE = 'https://marijkedevries.nl'
// Matches vite.config.ts — a preview deploy is mounted under a project path.
const BASE = (process.env.BASE_PATH || '/').replace(/\/*$/, '/')

// ---------------------------------------------------------------- 1. clean ---

await rm(join(DIST, '.vite'), { recursive: true, force: true })

// ------------------------------------------------------------ 2. redirects ---

/*
 * Read the map out of the TypeScript source rather than importing it — this is
 * a plain Node script and the file has no runtime dependencies, just literals.
 */
const legacySrc = await readFile(join(ROOT, 'src/legacy-urls.ts'), 'utf8')
const legacyUrls = [...legacySrc.matchAll(/\{\s*from:\s*'([^']+)',\s*to:\s*'([^']+)',\s*reason:\s*'([^']+)'\s*\}/g)].map(
  ([, from, to, reason]) => ({ from, to, reason }),
)

if (legacyUrls.length === 0) throw new Error('No legacy URLs parsed from src/legacy-urls.ts')

const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')

function redirectHtml({ to, reason }) {
  const href = `${BASE}${to.replace(/^\//, '')}`
  const target = `${SITE}${to}`
  const note =
    reason === 'retired'
      ? 'Deze pagina bestaat niet meer. U wordt doorgestuurd naar:'
      : 'Deze pagina is verhuisd. U wordt doorgestuurd naar:'
  return `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Verhuisd — Marijke de Vries</title>
<link rel="canonical" href="${escape(target)}">
<meta http-equiv="refresh" content="0; url=${escape(href)}">
<meta name="robots" content="noindex, follow">
<style>body{font:14px/20px Arial,Helvetica,sans-serif;color:#000305;margin:4rem auto;max-width:34em;padding:0 1rem;letter-spacing:1px}a{color:#000}</style>
</head>
<body>
<p>${note} <a href="${escape(href)}">${escape(target)}</a></p>
</body>
</html>
`
}

for (const entry of legacyUrls) {
  const out = join(DIST, entry.from.replace(/^\//, ''))
  await mkdir(dirname(out), { recursive: true })
  await writeFile(out, redirectHtml(entry))
}
console.log(`[postbuild] ${legacyUrls.length} legacy redirect stubs`)

// -------------------------------------------------------------- 3. the PDF ---

const pdfSrc = join(ROOT, 'assets/originals/docs/Programma Tinder Times.pdf')
if (existsSync(pdfSrc)) {
  const pdfOut = join(DIST, 'nl/Programma Tinder Times.pdf')
  await mkdir(dirname(pdfOut), { recursive: true })
  await copyFile(pdfSrc, pdfOut)
  console.log('[postbuild] programme PDF preserved at its original path')
}

// ------------------------------------------------------------- 4. sitemap ---

const pages = ['/', '/werken', '/series', '/bio', '/links', '/contact']
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((p) => `  <url>\n    <loc>${SITE}${p}</loc>\n    <changefreq>monthly</changefreq>\n  </url>`)
  .join('\n')}
</urlset>
`
await writeFile(join(DIST, 'sitemap.xml'), sitemap)
console.log(`[postbuild] sitemap.xml with ${pages.length} URLs`)
