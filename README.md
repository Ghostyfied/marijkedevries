# marijkedevries.nl

Recreation of the portfolio site of visual artist **Marijke de Vries**
(marijkedevries.nl) as a Vue 3 application, hosted on GitHub Pages.

**Status:** built and verified. The only step left is the DNS cutover, which is
the owner's. See [`PLAN.md`](PLAN.md) — §10 for measured results, §12 for the
handful of content decisions that need Marijke.

## Running it

```bash
npm install
npm run dev        # dev server (builds image derivatives first)
npm run build      # static build into dist/
npm run typecheck  # vue-tsc
npm run preview    # serve the build
```

The first build re-encodes the 80 masters in `assets/originals/` into 612
derivatives and takes about 95 seconds. It is incremental, so every build after
that is a no-op unless a master changes. CI caches the output.

`npm run build` pre-renders every route to a flat HTML file — `dist/werken.html`
— which GitHub Pages serves at `/werken` with no redirect hop. The pages carry
their content, title and meta tags without JavaScript; the client hydrates into
an SPA on top.

## Stack

| | |
|---|---|
| Vue 3 + TypeScript | `<script setup>` throughout |
| Vite | build |
| vue-router | six routes, `src/routes.ts` |
| vite-ssg | pre-renders each route at build time |
| unhead | per-page `<title>`, description, Open Graph, canonical |
| sharp | AVIF + WebP + JPEG derivatives at four widths, plus LQIP placeholders |
| PhotoSwipe 5 | the lightbox, restyled to match the original's fancyBox |

`@unhead/vue` is pinned to the v2 line on purpose: vite-ssg renders with its own
v2 copy, and a v3 in the app would register into a second, unrendered head
instance — the tags silently vanish from the output.

## Layout

```
assets/originals/         the 83 masters, the source of truth for imagery
scripts/
├─ build-images.mjs       sharp → public/img + src/generated/images.json
├─ migrate-works.mjs      docs/content-inventory.json → src/content/works.ts
└─ postbuild.mjs          strips Vite's SSR manifest from dist/
src/
├─ content/               works, bio, links, contact + the four essays as Markdown
├─ components/            MainNav, ResponsiveImage, ArtLightbox
├─ pages/                 one component per route
├─ styles/                tokens.css (measured from the original), base, content
├─ routes.ts  main.ts  App.vue
```

`public/img`, `public/media` and `src/generated` are all build output and are
gitignored.

## Content

Everything on the site comes from `src/content/`, so copy can be edited without
touching a component:

- `works.ts` — 42 gallery entries in 3 series. Generated from the live site by
  `npm run migrate:works`; captions like `"Title ⎪ mixed media ⎪ 120 x 120 ⎪ 2020"`
  are split into real fields, which then drive the caption, the alt text and the
  lightbox from one place.
- `bio.ts` — intro paragraphs and the ten cv sections, 58 rows.
- `series/*.md` — the four long-form essays, rendered to HTML at build time by a
  small plugin in `vite.config.ts`.
- `links.ts`, `contact.ts` — hand-transcribed, because the original markup for
  those two pages has unclosed `<a>` tags that swallow whole paragraphs.

## What the build emits

Beyond the six pages, `scripts/postbuild.mjs` writes:

- a stub at each of the **15 URLs the old site served**, carrying `rel=canonical`
  and a meta refresh — GitHub Pages cannot issue a 301, and these paths have
  inbound links from a VICE article, a Facebook event and Eventbrite;
- `sitemap.xml`, and the exhibition programme back at its original
  `/nl/Programma Tinder Times.pdf`.

`/404` is a real pre-rendered route rather than a copy of the home page, so an
unknown path gets a page that says so instead of home-page content under a 404.

## Deployment

`.github/workflows/deploy.yml` runs typecheck and build on every push to `main`,
asserts all six pages, the `CNAME` and all 41 works made it into `dist/`, then
publishes with `actions/deploy-pages`. No secrets.

Before the first deploy, set **Settings → Pages → Source** to *GitHub Actions*.
DNS and the custom-domain cutover are covered in `PLAN.md` §9.

## Checking it

Neither of these is a project dependency — they are occasional manual checks, and
adding them to `devDependencies` would put a hundred-odd packages into every CI
install for no gain.

```bash
npm run build && npm run preview

# side-by-side screenshots of old against new at three viewports
npm i -g playwright && node scripts/visual-diff.mjs --new http://localhost:4173

# scores
npx lighthouse http://localhost:4173/werken --view
```

`visual-diff.mjs` writes stacked comparisons to `.visual-diff/`. Run it from a
machine with outbound network access. It is deliberately not in CI, because
"does this look right" is a judgement, not an assertion.

Measured results, and the caveats on them, are in `PLAN.md` §10.

## Reference material

- **[`PLAN.md`](PLAN.md)** — analysis of the existing site and the full rebuild plan.
- **[`docs/content-inventory.json`](docs/content-inventory.json)** — the 42
  gallery entries as scraped from the live site.
- **[`docs/asset-manifest.json`](docs/asset-manifest.json)** — all 83 assets
  with byte size and pixel dimensions.
- **[`legacy/`](legacy/)** — verbatim archive of the current site's HTML, CSS
  and JavaScript, captured 2026-08-22.
