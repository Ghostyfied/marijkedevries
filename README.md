# marijkedevries.nl

Recreation of the portfolio site of visual artist **Marijke de Vries**
(marijkedevries.nl) as a Vue 3 application, hosted on GitHub Pages.

**Status:** phases 1–5 of 7 complete. All six pages are built and carry their
real content. Remaining: phase 6 (legacy-URL redirects, sitemap, JSON-LD) and
phase 7 (cross-browser pass, DNS cutover). See [`PLAN.md`](PLAN.md).

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

## Deployment

`.github/workflows/deploy.yml` runs typecheck and build on every push to `main`,
asserts all six pages, the `CNAME` and all 41 works made it into `dist/`, then
publishes with `actions/deploy-pages`. No secrets.

Before the first deploy, set **Settings → Pages → Source** to *GitHub Actions*.
DNS and the custom-domain cutover are covered in `PLAN.md` §9.

## Reference material

- **[`PLAN.md`](PLAN.md)** — analysis of the existing site and the full rebuild plan.
- **[`docs/content-inventory.json`](docs/content-inventory.json)** — the 42
  gallery entries as scraped from the live site.
- **[`docs/asset-manifest.json`](docs/asset-manifest.json)** — all 83 assets
  with byte size and pixel dimensions.
- **[`legacy/`](legacy/)** — verbatim archive of the current site's HTML, CSS
  and JavaScript, captured 2026-08-22.
