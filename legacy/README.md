# Legacy site archive

Verbatim copy of https://marijkedevries.nl as served on **2026-08-22**, captured
so the original remains available once DNS is repointed. Nothing here is built,
linted or published — it is a reference snapshot.

Images, the MP4 and the PDF are excluded to keep the repository light; they are
catalogued in [`../docs/asset-manifest.json`](../docs/asset-manifest.json) and
will be committed as masters under `assets/originals/`.

## Contents

| Path | Notes |
|---|---|
| `index.html` | The live home page. 38,288 bytes, of which 4,384 is markup — the rest is 33,904 blank lines from a broken editor save. |
| `main4.css` | The site's only stylesheet. |
| `nl/werken.html` `series.html` `biografie.html` `links.html` `contact.html` | The live Dutch pages. |
| `nl/index.html` | Orphaned. Stale duplicate of the home page; its own nav links resolve to `nl/nl/*` and 404. |
| `nl/over.html` `nl/projecten.html` | Orphaned. Removed from the nav in 2020, still served. |
| `eng/` | Orphaned English site, last touched Dec 2019. `eng/index.html` contains three duplicated `<body>` blocks. Image paths follow an older naming scheme. |
| `fancybox/` | fancyBox 2.1.5 plus four helper plugins. Never runs on the live site — jQuery is loaded over `http://` on an HTTPS-only origin and is blocked as mixed content. |

Relative paths are preserved, so serving this directory over plain HTTP with the
images restored reproduces the original site, lightbox included.
