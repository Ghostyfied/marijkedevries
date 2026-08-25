/**
 * Turns docs/content-inventory.json (scraped from the live werken page) into
 * src/content/works.ts. Captions on the original are a single string with
 * fields separated by ⎪ or |; this splits them into real fields.
 */
import { readFileSync, writeFileSync } from 'node:fs'

import { fileURLToPath } from 'node:url'
const ROOT = fileURLToPath(new URL('..', import.meta.url))
const inventory = JSON.parse(readFileSync(new URL("../docs/content-inventory.json", import.meta.url), 'utf8'))

// A year may carry a trailing remark: "2019 with details and instagram post".
const YEAR = /^((?:19|20)\d{2})\b\s*(.*)$/
// Dimensions are digits, separators and at least one x: "100 x 80", "100 + 100 x 16".
const DIMS = /^[\d][\d,.\s+×x]*$/i
const HAS_X = /[×x]/i

function parseCaption(raw) {
  const parts = raw
    .split(/[⎪|]/)
    .map((s) => s.replace(/\s+/g, ' ').trim())
    .filter(Boolean)

  if (parts.length === 0) return { title: 'Zonder titel' }

  const title = parts.shift()
  let year, dimensions, note
  const rest = []

  for (const p of parts) {
    const y = !year && YEAR.exec(p)
    if (y) {
      year = Number(y[1])
      if (y[2]) note = y[2]
    } else if (!dimensions && DIMS.test(p) && HAS_X.test(p)) {
      dimensions = p
    } else {
      rest.push(p)
    }
  }

  return { title, medium: rest.join(', ') || undefined, dimensions, year, note }
}

/** `../images/love-in-times-of-corona/muze.jpg` -> `love-in-times-of-corona/muze.jpg` */
const key = (src) => src.replace(/^\.\.\/images\//, '')

const id = (s) =>
  s
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const series = inventory.map((s) => {
  const groups = []
  let current = { label: undefined, works: [] }
  groups.push(current)

  for (const item of s.items) {
    if (item.group && current.works.length > 0) {
      current = { label: item.group, works: [] }
      groups.push(current)
    } else if (item.group) {
      current.label = item.group
    }

    if (item.video) {
      current.works.push({ kind: 'video', src: key(item.video) })
      continue
    }
    current.works.push({
      kind: 'image',
      image: key(item.src),
      displayHeight: item.thumbH ?? 250,
      ...parseCaption(item.caption),
    })
  }

  return { title: s.title, id: id(s.title), groups: groups.filter((g) => g.works.length) }
})

const lines = []
lines.push(`/**`)
lines.push(` * The werken page, extracted from the original site's markup.`)
lines.push(` *`)
lines.push(` * Captions there were one string per work — "Title ⎪ medium ⎪ 120 x 120 ⎪ 2020" —`)
lines.push(` * held in a title attribute that only the lightbox read. Split into fields, they`)
lines.push(` * drive the caption, the alt text and the page copy from one place.`)
lines.push(` *`)
lines.push(` * \`image\` and \`src\` are keys into src/generated/images.json, which the image`)
lines.push(` * build writes from assets/originals/.`)
lines.push(` */`)
lines.push(``)
lines.push(`import type { Series } from '../types'`)
lines.push(``)
lines.push(`export const series: Series[] = ${JSON.stringify(series, null, 2)}`)
lines.push(``)

writeFileSync(new URL("../src/content/nl/works.ts", import.meta.url), lines.join('\n'))

// Report so the parse can be eyeballed rather than trusted.
let n = 0
for (const s of series) {
  console.log(`\n## ${s.title}`)
  for (const g of s.groups) {
    if (g.label) console.log(`  [${g.label}]`)
    for (const w of g.works) {
      n += 1
      if (w.kind === 'video') {
        console.log(`    VIDEO  ${w.src}`)
      } else {
        console.log(
          `    ${(w.title || '').padEnd(34)} | ${(w.medium || '—').padEnd(46)} | ` +
            `${(w.dimensions || '—').padEnd(14)} | ${w.year || '—'}`,
        )
      }
    }
  }
}
console.log(`\n${n} entries`)
