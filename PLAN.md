# marijkedevries.nl — analysis & recreation plan

Rebuild of the portfolio site of visual artist Marijke de Vries as a Vue 3
application, hosted free on GitHub Pages under the existing domain.

Analysis performed 2026-08-22 against the live site.

**Agreed scope:** Dutch only (matching what visitors see today) · same visual
design, with the site's current defects repaired.

---

## 1. What the current site is

A hand-written static XHTML site served by Apache. No CMS, no build step, no
analytics, no cookies, no forms. Everything is flat files on disk.

| | |
|---|---|
| Markup | XHTML 1.0 Transitional, hand-authored |
| Styling | one stylesheet, `main4.css`, 6.9 KB, float-based layout, single breakpoint at 780 px |
| Scripting | jQuery 1.11.1 (CDN) + fancyBox 2.1.5 with 4 helper plugins |
| Server | `Apache/2`, HTTP 301 → HTTPS, no HSTS, no compression headers observed |
| Credited designer | majalava (linked from the archived English links page) |
| Last content change | home page 2021-02-28; every other live page 2020-10 / 2020-11 |

### Live pages (6)

| URL | Page | Content |
|---|---|---|
| `/` (`/index.html`) | home | Studio photo `model_session_bas.jpg`, nothing else |
| `/nl/werken.html` | werken | The gallery — 3 series, 41 images + 1 video |
| `/nl/series.html` | series / thema's | 4 long-form Dutch essays incl. Rob Perrée's curator text |
| `/nl/biografie.html` | bio | Intro paragraphs + 10 CV tables (~60 rows) |
| `/nl/links.html` | links | 4 external links |
| `/nl/contact.html` | contact / nieuws | Contact details + the Nov 2020 exhibition announcement + flyer |

### Orphaned but still publicly reachable (10)

Nothing links to these; they are all indexable.

- `/nl/index.html` — a stale duplicate of the homepage carrying the Nov 2020
  news block. Its own nav links are broken (`nl/nl/werken.html` → 404).
- `/nl/over.html`, `/nl/projecten.html` — removed from the nav, content still live.
- `/eng/` — a complete English site (7 pages) last touched Dec 2019. Its nav
  links were commented out of the Dutch pages. `/eng/index.html` contains three
  duplicated `<body>` blocks. Its image paths point at an older `/images/N-*.jpg`
  naming scheme that no longer matches the Dutch pages.

### Assets

83 files, **82.5 MB** total: 80 JPEG/PNG images, one MP4 stored twice under
different names (byte-identical), and one PDF programme. Largest single image 7.3 MB / 2743 × 3429.
Median image 1.3 megapixels. No derivatives, no thumbnails — every `<img>` points
at the full-resolution master and the browser scales it down with a `height`
attribute.

---

## 2. Design system, as measured

Everything below is lifted from `main4.css` and verified against rendered
screenshots at 1440 / 820 / 390 px.

```
Colour        background      #ffffff
              body text       #000305
              nav link        #333333
              nav hover/active#cccccc
              link            #000000  → #cccccc on hover
              nav strip bg    #f5f4f2

Type          family          Arial, Helvetica, sans-serif
              base            87.5%  → 14 px
              body line-height 20 px, letter-spacing 1 px
              site title      25 px bold, letter-spacing 3 px
              nav             14 px bold, letter-spacing 3 px, line-height 30 px
              h2              1.271em → ~17.8 px, weight 400

Layout        left column     ~250 px (title block 350 px), content column 70%
              content inset   padding 2% 2% 2% 5%
              breakpoint      780 px — nav centres, columns stack

Motion        nav colour      0.5s ease-out
              image hover     opacity 1 → 0.6, 0.4s ease-out

Gallery       ul.img-list li { display:inline-block; margin:0 1em 1em 0 }
              images sized by a fixed height attribute (250 / 200 / 150 px),
              producing rows of equal-height, variable-width thumbnails

Lightbox      fancyBox 2.1.5 — white overlay at 0.8 opacity, image on a white
              card, caption below the image, 80 × 80 thumbnail strip along the
              bottom, no close button, no transition between slides
```

Two CSS declarations are bugs that are masked in practice and should **not** be
carried over: `body { line-height: 10px }` (overridden to 20 px on every element
that matters) and `table { font-weight: bold }` (which is why the entire CV
renders bold).

---

## 3. Defects found

These are the things the rebuild fixes. Each was verified, not assumed.

**1. The lightbox is dead.** Every page loads jQuery from
`http://code.jquery.com/jquery-latest.min.js` — plain HTTP — while the site is
HTTPS-only (`http://` 301-redirects to `https://`). Browsers block mixed active
content unconditionally, so jQuery never loads, fancyBox never initialises, and
the `<a class="fancybox">` wrappers fall back to what they are: plain links to
multi-megabyte JPEGs. Clicking any artwork today navigates away from the site to
a raw image file.

**2. The gallery page weighs 61 MB.** `/nl/werken.html` requests 42 full-resolution
files on load, none lazy-loaded, none responsive:

| Series | Items | Payload |
|---|---:|---:|
| Liefde in tijden van Corona | 12 | 35.3 MB |
| Tinder Times | 21 | 22.2 MB |
| Falling angel | 9 | 3.5 MB |
| **Total** | **42** | **61.0 MB** |

**3. It is not usable on a phone.** At a 390 px viewport the document renders
560 px wide — the page scrolls sideways. The viewport meta also sets
`maximum-scale=1`, which blocks pinch-zoom entirely.

**4. Content is five years stale.** The contact page still advertises an
exhibition running 21–24 November 2020 with live ticket links.

**5. Nothing for search or sharing.** All six pages share one `<title>`
("Marijke de Vries artworks") and one meta description. No favicon (404), no
`robots.txt` (404), no `sitemap.xml` (404), no Open Graph tags. All 41 artwork
images carry the identical alt text "Marijke de Vries Painting" — the real
titles, media and dimensions sit in a `title` attribute that only fancyBox reads.

**6. The markup is damaged.** `/index.html` is 38,288 bytes of which 4,384 bytes
is actual HTML — 33,904 blank lines from a broken editor save. Elsewhere:
`</p?` instead of `</p>`, `<b>` tags never closed, `<li>` nested inside `<li>`,
`target=_blank"` with a stray quote, `<font color="#417dc8">`.

**7. Duplicate content.** `/nl/index.html` competes with `/` for the same
content and is indexable.

---

## 4. Target architecture

| Concern | Choice | Why |
|---|---|---|
| Framework | **Vue 3** + `<script setup>` + TypeScript | As requested |
| Build | **Vite** | Fastest path, zero config for this shape of site |
| Routing | **vue-router 4** | 6 routes |
| Rendering | **vite-ssg** — pre-render every route to static HTML at build, hydrate as an SPA | GitHub Pages serves no server-side redirects; pre-rendering gives real URLs, real `<title>`s and content that search engines and social previews see without JS |
| Lightbox | **PhotoSwipe 5**, restyled white to match fancyBox | Handles touch, pinch-zoom, keyboard and focus trapping properly — all things the original never did |
| Images | **sharp** build script → AVIF + WebP + JPEG at 5 widths, `<picture>` + `srcset` | See §6 |
| Content | TypeScript data modules + Markdown for prose | See §5 |
| Styling | Plain CSS with custom properties, scoped per component | The design is ~200 lines of CSS; a framework would be more code than it replaces |
| Hosting | **GitHub Pages** + GitHub Actions | Free, custom domain, automatic HTTPS |

**Why vite-ssg over a plain SPA:** GitHub Pages has no rewrite rules, so an SPA
needs the `404.html`-copy hack, which serves a soft 404 to crawlers and flashes
blank on first paint. Pre-rendering removes both problems for one small
dependency. *Fallback if `vite-ssg` ever becomes a maintenance liability:* drop
it, ship the SPA, and copy `index.html` to `404.html` — a two-line change.

**Why not Nuxt:** it would work, and gives image handling and SEO out of the box.
But this site sat untouched for five years and will likely do so again. A Vite +
Vue + vue-router app has a much smaller surface to rot. Nuxt is the right call
only if the site later grows a blog or a CMS.

### Repository layout

```
marijkedevries/
├─ .github/workflows/deploy.yml     build + deploy to Pages
├─ assets/originals/                the 83 master files, committed once
├─ scripts/
│  ├─ build-images.ts               sharp → derivatives + manifest.json
│  └─ visual-diff.ts                Playwright old-vs-new comparison
├─ src/
│  ├─ components/  SiteHeader MainNav WorkGrid WorkThumb Lightbox CvTable
│  ├─ content/
│  │  ├─ works.ts                   3 series, 42 entries (see docs/content-inventory.json)
│  │  ├─ bio.ts                     intro + 10 CV tables as structured rows
│  │  ├─ series/*.md                the 4 long-form essays
│  │  ├─ links.ts  contact.ts  news.ts
│  ├─ pages/       Home Werken Series Bio Links Contact
│  ├─ styles/tokens.css             the values from §2
│  └─ main.ts  router.ts  App.vue
├─ public/
│  ├─ CNAME  robots.txt  favicon.svg
│  └─ nl/Programma Tinder Times.pdf preserved at its original path
├─ legacy/                          archived copy of the current site, not published
└─ docs/content-inventory.json      machine-readable dump of the 42 gallery entries
```

---

## 5. Content model

The gallery captions already encode structured data, separated by `⎪` or `|`:

```
"Love in the times of Corona ⎪ mixed media on canvas ⎪ 120 x 120 ⎪ 2020"
```

Parsed once into fields, so captions, alt text, `<title>`s and any future
filtering all read from one source:

```ts
type Work = {
  id: string
  title: string          // "Love in the times of Corona"
  medium?: string        // "mixed media on canvas"
  dimensions?: string    // "120 x 120"
  year?: number          // 2020
  image: string          // key into the image manifest
  group?: string         // "model paintings on rice paper"
}

type Series = { title: string; works: Work[] }
```

`docs/content-inventory.json` in this repo is the extraction from the live site:
3 series, 42 entries, every caption and source path already captured. It is the
input to `src/content/works.ts`.

Four captions need the client's eye before they ship — the source has typos:
`"Muze ⎪ drawin ⎪ …"`, `"Complimentary"` (vs *Complementary*), `"Blueeyes"`, and
`"Room ⎪ oil on paper ⎪ 16 x 16"` on a file named `Room, 24 x 18, oil on canvas.jpg`.

The CV becomes structured rows rather than `<table>` markup, so it can be
restyled and read correctly by screen readers:

```ts
type CvSection = { heading: string; rows: { period: string; text: string }[] }
```

Ten sections: solo exposities, groeps exposities, A.I.R., prijzen, subsidies,
publicaties, grafiek, opdrachten, aankopen, pers.

---

## 6. Images

The single biggest improvement available. Measured, by re-encoding the actual files:

| | Size |
|---|---:|
| Originals as served today | 76.7 MB |
| WebP @ 1800 px (lightbox) | 9.7 MB |
| WebP @ 500 px (grid thumbnails) | 1.8 MB |
| **All derivatives** | **11.5 MB — 15% of the originals** |

With lazy-loading on top, the gallery page goes from a 61 MB eager load to
roughly 300 KB above the fold.

**Pipeline.** `scripts/build-images.ts` walks `assets/originals/`, and for each
image emits AVIF + WebP + JPEG at 400 / 800 / 1200 / 1800 / 2400 px (never
upscaling), plus intrinsic dimensions and a ~20-byte blurred placeholder, into
`manifest.json`. Components read the manifest, so `<picture>`/`srcset` markup and
`width`/`height` attributes are generated — no layout shift, no hand-maintained
lists.

Derivatives are generated in CI and are not committed. The masters are, because
they are the client's originals and this repo should be where they survive.

The two byte-identical 2.9 MB MP4 copies (`images/Falling Angel.mp4`, referenced
only by the orphaned English page, and `images/falling-angel/falling-angel.mp4`)
get deduplicated to one, with a poster
frame so the video no longer downloads before it is played.

Filenames get normalised on the way in — `Swimmers, detail of dyptich 200 x 200 cm .jpg`
becomes `swimmers-detail-diptych.jpg`. Spaces and commas in URLs are a
long-running source of breakage on this site.

---

## 7. Layout and fidelity

Rebuild the float layout as CSS grid — a sidebar column and a content column —
matching the measured positions from §2 at desktop width. The visual result is
the same; the mechanism is one that can also collapse cleanly on a phone.

Two deliberate departures from the original rendering, both to fix defects:

- **Gallery sizing.** The original fixes each thumbnail's height in a `height`
  attribute (250 / 200 / 150 px), which is what forces horizontal scroll on a
  phone. Replace with a flex row that keeps the equal-height look at desktop
  (`flex-basis` derived from each image's real aspect ratio) and reflows to one
  or two columns below 780 px. Same appearance at desktop, no overflow anywhere.
- **Viewport meta.** Drop `maximum-scale=1` so pinch-zoom works.

Everything else — the type scale, the letter-spacing, the greys, the hover
fades, the white lightbox with its caption underneath and its thumbnail strip —
is reproduced.

---

## 8. URLs and SEO

The old `.html` paths have inbound links (the VICE article, a Facebook event,
Eventbrite). GitHub Pages cannot issue 301s, so each legacy path gets a small
generated stub with `<link rel="canonical">` and a meta refresh:

| Old | New |
|---|---|
| `/` | `/` |
| `/nl/werken.html` | `/werken` |
| `/nl/series.html` | `/series` |
| `/nl/biografie.html` | `/bio` |
| `/nl/links.html` | `/links` |
| `/nl/contact.html` | `/contact` |
| `/nl/index.html`, `/nl/over.html`, `/nl/projecten.html`, `/eng/*` | → `/` (archived in `legacy/`, not published) |
| `/nl/Programma Tinder Times.pdf` | unchanged |

Add per-page `<title>` and description, Open Graph and Twitter card tags with a
real preview image, `JSON-LD` `Person` / `VisualArtist` markup, a generated
`sitemap.xml`, a `robots.txt`, and a favicon.

Real alt text on every artwork, built from the parsed caption
("Love in the times of Corona, mixed media on canvas, 120 × 120 cm, 2020")
instead of 41 copies of "Marijke de Vries Painting".

---

## 9. Deployment

GitHub Actions builds on push to `main` and deploys with `actions/deploy-pages`.
No secrets, no third-party service.

Because the site is served from the apex domain, Vite's `base` stays `/`.

**DNS** at the current registrar, once the build is verified on the
`*.github.io` URL:

```
A      @    185.199.108.153   (also .109, .110, .111)
AAAA   @    2606:50c0:8000::153   (also 8001, 8002, 8003)
CNAME  www  ghostyfied.github.io.
```

`public/CNAME` contains `marijkedevries.nl`; "Enforce HTTPS" is switched on in
the repository's Pages settings once the certificate is issued.

**Cutover:** keep the current host live until the Pages build is verified at the
temporary URL, then repoint DNS. Rollback is a DNS change. Take a full backup of
the existing host first — the masters in `assets/originals/` already are one.

---

## 10. Verification

`scripts/visual-diff.ts` drives Playwright over old and new at 1440 / 820 / 390 px
and writes side-by-side comparisons. The baseline screenshots of the current site
are already captured. Sign-off is per page, by eye, against those.

Plus, before cutover:

- Lightbox works with mouse, touch, and keyboard on the gallery page.
- No horizontal scroll at 320 px.
- Lighthouse ≥ 95 on performance and accessibility for `/werken` — currently
  unreachable at 61 MB.
- Every one of the 83 assets resolves; no 404s in the build output.
- All legacy URLs redirect.

---

## 11. Work plan

| Phase | Work | Est. |
|---|---|---|
| 1 | Scaffold Vite + Vue 3 + router + vite-ssg; CI to Pages; verify on `*.github.io` | 0.5 d |
| 2 | Layout shell — header, nav, grid columns, `tokens.css`; visual diff on the text pages | 1 d |
| 3 | Image pipeline — sharp script, manifest, `<picture>` component | 0.5 d |
| 4 | Content migration — works, CV, essays, links, contact; caption parsing | 1 d |
| 5 | Gallery + lightbox — grid, PhotoSwipe restyled, thumbnail strip, video | 1 d |
| 6 | SEO, redirects, favicon, sitemap, alt text, JSON-LD | 0.5 d |
| 7 | Visual diff sign-off, Lighthouse, cross-browser, DNS cutover | 0.5 d |
| | | **~5 days** |

Phases 1–3 are the foundation and are worth doing in order. 4 and 5 are
independent of each other.

---

## 12. Open items for the client

None of these block the build; they need Marijke's answer before launch.

1. **The news block.** It advertises a November 2020 exhibition. Carry it over
   as an archived item, replace it with something current, or drop the section?
2. **The English site.** Archived here and not published. Worth reviving as a
   proper second language, or is Dutch-only correct going forward?
3. **`over` and `projecten`.** Both were quietly removed from the nav in 2020 but
   the pages are still live. Restore, or let them go?
4. **The four caption typos** listed in §5.
5. **Newer work.** Nothing on the site postdates 2020. If there are works from
   the last five years, the new content model makes adding them straightforward.
