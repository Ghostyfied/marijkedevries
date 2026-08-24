/**
 * Screenshots the rebuilt site beside the original and writes stacked
 * comparisons to .visual-diff/.
 *
 *   node scripts/visual-diff.mjs                 # against the live old site
 *   node scripts/visual-diff.mjs --new http://…  # against a local build
 *
 * The old site is HTTP-only from a browser's point of view (its jQuery is
 * blocked as mixed content), but the layout it renders is what we are matching,
 * so screenshots of it are still the reference.
 *
 * Requires playwright. Not part of the build or CI — it is a hand-run check for
 * sign-off, since "does this look right" is not something to assert in a test.
 *
 * Run it from a machine with outbound network access. The container this was
 * developed in could not reach the old site from a browser, so the comparisons
 * behind the current sign-off were made against a local mirror instead.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const OUT = join(ROOT, '.visual-diff')

const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`)
  return i === -1 ? fallback : process.argv[i + 1]
}

const OLD = arg('old', 'https://marijkedevries.nl')
const NEW = arg('new', 'http://127.0.0.1:4173')

/** old path -> new path */
const PAGES = [
  ['home', '/', '/'],
  ['werken', '/nl/werken.html', '/werken'],
  ['series', '/nl/series.html', '/series'],
  ['bio', '/nl/biografie.html', '/bio'],
  ['links', '/nl/links.html', '/links'],
  ['contact', '/nl/contact.html', '/contact'],
]

const VIEWPORTS = [
  ['desktop', 1440, 900],
  ['tablet', 820, 1180],
  ['mobile', 390, 844],
]

const { chromium } = await import('playwright')

await mkdir(OUT, { recursive: true })
const browser = await chromium.launch()
const report = []

/** Loads a page, scrolls it so lazy images resolve, and captures it whole. */
async function shoot(ctx, url, file) {
  const page = await ctx.newPage()
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 120000 })
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 100))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(1200)
    await page.screenshot({ path: file, fullPage: true })
    const width = await page.evaluate(() => document.documentElement.scrollWidth)
    const height = await page.evaluate(() => document.body.scrollHeight)
    return { width, height }
  } finally {
    await page.close()
  }
}

for (const [vp, w, h] of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } })
  for (const [name, oldPath, newPath] of PAGES) {
    const a = await shoot(ctx, OLD + oldPath, join(OUT, `${vp}-${name}-old.png`))
    const b = await shoot(ctx, NEW + newPath, join(OUT, `${vp}-${name}-new.png`))
    const overflow = b.width > w
    report.push({ viewport: vp, page: name, old: a, new: b, overflow })
    console.log(
      `${vp}/${name.padEnd(8)} old ${a.width}x${a.height}  new ${b.width}x${b.height}` +
        `${overflow ? '  OVERFLOW' : ''}`,
    )
  }
  await ctx.close()
}

await browser.close()
await writeFile(join(OUT, 'report.json'), JSON.stringify(report, null, 2))
console.log(`\nScreenshots and report.json in ${OUT}`)
