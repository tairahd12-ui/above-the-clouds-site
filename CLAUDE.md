# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing/portfolio website for **above the clouds**, a one-person (Tyler) video production studio (fashion films, interviews, PR) with a planned inbound-tourism memory-video service (Phase 2, not yet public). Plain static HTML/CSS/JS — no build step, no framework, no package.json.

## Commands

There is no build/lint/test tooling. To preview locally, serve the directory with any static file server, e.g.:

```bash
python3 -m http.server 5173
```

Then open `http://localhost:5173/index.html`.

### Deploy

Deploys are **manual**, not git-triggered (the Vercel↔GitHub auto-link failed to set up — `vercel git connect` was never completed). After pushing to GitHub, also run:

```bash
git push origin main
npx --yes vercel --prod --yes
```

Production URL: https://above-the-clouds-site.vercel.app
GitHub: https://github.com/tairahd12-ui/above-the-clouds-site (public repo)

## Architecture

5 static pages, no routing/templating: `index.html` (TOP), `about.html`, `works.html`, `service.html`, `contact.html`. Every page repeats the same header/nav/footer markup by hand — when changing nav links or the footer, update all 5 files.

**`css/style.css`** — single stylesheet, CSS-variable-driven theme (`:root` block at the top). The whole site is monochrome (near-black `--color-accent` on white) by deliberate design choice — do not reintroduce a saturated accent color. Fonts are Google Fonts (Cormorant Garamond for display, Zen Kaku Gothic New for body), loaded via `<link>` in each page's `<head>`.

**`js/main.js`** — one file, no modules/bundler, shared across all pages. Handles:
- sticky header scroll state, mobile nav toggle
- Works page category filter (`.filter-btn` / `.work-item[data-category]`)
- FAQ accordion (Service page)
- Contact form: submits via a `mailto:` link built client-side (no backend/Netlify — see `CONTACT_EMAIL` const), so it works on any static host
- **`HERO_CLIPS`** (top of file): the TOP-page hero video playlist. Autoplays muted/looping through the array; on each clip's `ended` event it advances to the next `{src, poster}` and loops back to the start. To add a hero clip, append an entry here — the video file must already be web-compressed (see below).

**`assets/`** — organized by page (`assets/top/`, `assets/works/`, `assets/about/`). Every video has a same-name `.jpg` poster (extracted frame) used as the `poster` attribute so nothing downloads until playback starts (`preload="none"` on Works/About videos; hero videos autoplay but are pre-compressed small).

## Working with video assets

Source footage lives outside this repo (external drive), far too large for web (100MB–1.8GB masters). The pattern used throughout this project for adding new video to the site:

1. Transcode with ffmpeg: H.264, `-crf 23`, cap the long edge around 1280–1600px, strip audio with `-an` for hero/background clips, `+faststart`. Target output is single-digit-to-low-teens MB.
2. Extract a poster frame: `ffmpeg -ss <t> -i out.mp4 -frames:v 1 out.jpg`.
3. Drop both into the matching `assets/<section>/` folder and reference them from the HTML/JS.

No `ffmpeg` is installed globally on the dev machine — if it's missing, a local copy can be pulled via a throwaway Python venv (`pip install imageio-ffmpeg`, binary at `imageio_ffmpeg.get_ffmpeg_exe()`) rather than relying on Homebrew (Homebrew's Ruby version check is broken on this machine's current macOS version).

## Content notes

- Eden's (tourism co-lead) profile on `about.html` is present but **commented out** in the HTML — not deleted — pending her go-ahead to publish. Don't remove the commented block.
- The inbound tourism video service is Phase 2 and intentionally not built out as a page yet; Contact form has a placeholder option for it marked "準備中".
- Copy is deliberately terse site-wide (no decorative "eyebrow" labels, no tagline-style hero headline) per explicit design direction — keep new copy minimal rather than adding descriptive paragraphs back in.
