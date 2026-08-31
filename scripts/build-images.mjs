/**
 * Generates responsive derivatives from the masters in assets/originals/.
 *
 * For each image: AVIF + WebP + JPEG at up to four widths, never upscaling,
 * plus a blurred placeholder. Writes them to public/img/ and an index to
 * src/generated/images.json, which the Vue components read so that <picture>
 * markup and width/height attributes are generated rather than hand-kept.
 *
 * Incremental: a derivative is only re-encoded when it is missing or older
 * than its master, so repeat builds cost nothing.
 *
 * AVIF runs at effort 2 rather than sharp's default 4. Measured on a 3057px
 * master: effort 4 took 14.8s for 175 KB, effort 2 took 2.4s for 189 KB. At
 * 80 images the default would put the build into the hour range.
 */
import { copyFile, mkdir, readdir, stat, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { basename, dirname, extname, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { cpus } from 'node:os'
import sharp from 'sharp'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const SRC_DIR = join(ROOT, 'assets/originals')
const OUT_DIR = join(ROOT, 'public/img')
const MANIFEST = join(ROOT, 'src/generated/images.json')

const WIDTHS = [400, 800, 1200, 2000]
const FORMATS = [
  { ext: 'avif', type: 'image/avif', opts: { quality: 52, effort: 2 } },
  { ext: 'webp', type: 'image/webp', opts: { quality: 80 } },
  { ext: 'jpg', type: 'image/jpeg', opts: { quality: 80, mozjpeg: true } },
]
const RASTER = new Set(['.jpg', '.jpeg', '.png'])
const CONCURRENCY = Math.max(1, cpus().length - 1)

/** `love-in-times-of-corona/bas-iphone.jpg` -> `love-in-times-of-corona--bas-iphone` */
function slugify(relPath) {
  return relPath
    .slice(0, -extname(relPath).length)
    .toLowerCase()
    .replace(/\//g, '--')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Distinct masters can slugify identically — 'Swimmers, …' and 'Swimmers_, …'
 * differ only in punctuation, which slugify strips — and a shared slug means a
 * shared output directory, with the last writer's derivatives served for both.
 * Slugs are therefore assigned up front from a sorted list, with a counter
 * suffix on repeats, so every master keeps its own derivatives.
 */
function assignSlugs(files) {
  const used = new Map()
  const bySlug = new Map()
  for (const file of files) {
    const rel = relative(SRC_DIR, file).split('\\').join('/')
    const base = slugify(rel)
    const n = (used.get(base) ?? 0) + 1
    used.set(base, n)
    bySlug.set(file, n === 1 ? base : `${base}-${n}`)
  }
  return bySlug
}

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else out.push(full)
  }
  return out
}

/** True when `out` is missing or older than `src`. */
async function stale(out, srcMtime) {
  if (!existsSync(out)) return true
  return (await stat(out)).mtimeMs < srcMtime
}

async function processImage(file, slug) {
  const rel = relative(SRC_DIR, file).split('\\').join('/')
  const outDir = join(OUT_DIR, slug)
  await mkdir(outDir, { recursive: true })

  const srcMtime = (await stat(file)).mtimeMs
  const image = sharp(file)
  const { width, height } = await image.metadata()

  // Never upscale. A master narrower than the largest target also gets its
  // native width as the top variant, so small sources (the Dwaler affiche is
  // 459px) serve at full resolution instead of capping at the step below.
  const widths = WIDTHS.filter((w) => w < width)
  if (width <= WIDTHS[WIDTHS.length - 1]) widths.push(width)

  const sources = {}
  for (const { ext, type, opts } of FORMATS) {
    const entries = []
    for (const w of widths) {
      const out = join(outDir, `${w}.${ext}`)
      if (await stale(out, srcMtime)) {
        await sharp(file).resize({ width: w, withoutEnlargement: true }).toFormat(ext === 'jpg' ? 'jpeg' : ext, opts).toFile(out)
      }
      // Site-relative, no leading slash: components prefix Vite's BASE_URL so
      // the same manifest works at the apex domain and under a project path.
      entries.push({ w, url: `img/${slug}/${w}.${ext}` })
    }
    sources[ext] = { type, entries }
  }

  // 24px blurred placeholder, inlined as a data URI to hold the layout.
  const lqipBuf = await sharp(file).resize({ width: 24 }).blur(1.2).webp({ quality: 40 }).toBuffer()

  return [
    rel,
    {
      slug,
      width,
      height,
      aspect: +(width / height).toFixed(4),
      sources,
      lqip: `data:image/webp;base64,${lqipBuf.toString('base64')}`,
      fallback: `img/${slug}/${widths[widths.length - 1]}.jpg`,
    },
  ]
}

/** Runs `worker` over `items` with a bounded number in flight. */
async function pool(items, limit, worker) {
  const results = []
  let i = 0
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (i < items.length) {
        const idx = i++
        results[idx] = await worker(items[idx], idx)
      }
    }),
  )
  return results
}

const started = Date.now()
// Sorted so duplicate-slug numbering is stable across machines and rebuilds.
const all = (await walk(SRC_DIR)).sort()
const images = all.filter((f) => RASTER.has(extname(f).toLowerCase()))
const others = all.filter((f) => !RASTER.has(extname(f).toLowerCase()))
const slugs = assignSlugs(images)

let done = 0
const entries = await pool(images, CONCURRENCY, async (file) => {
  const entry = await processImage(file, slugs.get(file))
  done += 1
  if (done % 10 === 0 || done === images.length) {
    process.stdout.write(`[images] ${done}/${images.length}\n`)
  }
  return entry
})

// Video and the PDF programme are copied through untouched.
await mkdir(join(ROOT, 'public/media'), { recursive: true })
const passthrough = {}
for (const file of others) {
  const rel = relative(SRC_DIR, file).split('\\').join('/')
  const name = basename(file).toLowerCase().replace(/[^a-z0-9.]+/g, '-')
  const dest = join(ROOT, 'public/media', name)
  if (await stale(dest, (await stat(file)).mtimeMs)) await copyFile(file, dest)
  passthrough[rel] = `media/${name}`
}

await mkdir(dirname(MANIFEST), { recursive: true })
await writeFile(
  MANIFEST,
  JSON.stringify({ images: Object.fromEntries(entries), media: passthrough }, null, 1),
)

console.log(
  `[images] ${images.length} images, ${others.length} passthrough, ` +
    `${((Date.now() - started) / 1000).toFixed(1)}s`,
)
