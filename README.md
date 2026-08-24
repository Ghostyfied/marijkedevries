# marijkedevries.nl

Recreation of the portfolio site of visual artist **Marijke de Vries**
(marijkedevries.nl) as a Vue 3 application, hosted on GitHub Pages.

**Status:** phase 1 of 7 complete — scaffold and CI. The six routes exist and
pre-render; their content lands in phases 2–5. See [`PLAN.md`](PLAN.md).

## Running it

```bash
npm install
npm run dev        # dev server
npm run build      # static build into dist/
npm run typecheck  # vue-tsc
npm run preview    # serve the build
```

`npm run build` pre-renders every route to a flat HTML file — `dist/werken.html`
— which GitHub Pages serves at `/werken` with no redirect hop. The pages carry
their real content, title and meta tags without JavaScript; the client hydrates
into an SPA on top.

## Stack

| | |
|---|---|
| Vue 3 + TypeScript | `<script setup>` throughout |
| Vite | build |
| vue-router | six routes, `src/routes.ts` |
| vite-ssg | pre-renders each route at build time |
| unhead | per-page `<title>`, description, Open Graph, canonical |

`@unhead/vue` is pinned to the v2 line on purpose: vite-ssg renders with its own
v2 copy, and a v3 in the app would register into a second, unrendered head
instance — the tags silently vanish from the output.

## Deployment

`.github/workflows/deploy.yml` runs typecheck and build on every push to `main`,
asserts all six pages plus the `CNAME` made it into `dist/`, and publishes with
`actions/deploy-pages`. No secrets.

Before the first deploy, set **Settings → Pages → Source** to *GitHub Actions*.
DNS and the custom-domain cutover are covered in `PLAN.md` §9.

## Layout

```
src/
├─ pages/       one component per route
├─ components/  MainNav — shared chrome lives in App.vue
├─ styles/      tokens.css (measured from the original), base.css
├─ routes.ts    routes + per-page title/description
└─ main.ts      ViteSSG entry
scripts/postbuild.mjs   strips Vite's SSR manifest from dist/
```

## Reference material

- **[`PLAN.md`](PLAN.md)** — analysis of the existing site and the full rebuild plan.
- **[`docs/content-inventory.json`](docs/content-inventory.json)** — the 42
  gallery entries extracted from the live site.
- **[`docs/asset-manifest.json`](docs/asset-manifest.json)** — all 83 assets
  with byte size and pixel dimensions.
- **[`legacy/`](legacy/)** — verbatim archive of the current site's HTML, CSS
  and JavaScript, captured 2026-08-22.
