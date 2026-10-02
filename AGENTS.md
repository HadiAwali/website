# AGENTS.md — Northline Studio website

## What this project is

A static, single-page marketing/legal site for **Northline Studio** (an independent Android app brand). It holds:

- the studio home / About / Contact sections,
- a Play-Store-style listing for the **CodeSnap** app (screenshots, What's new, About this app),
- the app's **hosted Privacy Policy and Terms of Service**, which the Android app opens in a browser tab.

Live at <https://studio-northline.github.io/website/> (GitHub Pages, deployed from `main`).
Repo: <https://github.com/Studio-Northline/website> — local clone: `C:\Users\hadir\AndroidStudioProjects\website`.

Related project (do not confuse): `C:\Users\hadir\AndroidStudioProjects\CodeSnap` is the Android app itself. It used to contain a `/website` folder; that copy was removed — the site lives only here, and the app just links to it.

## Stack and constraints

- Plain HTML + CSS + vanilla JS. **No build step, no package.json, no framework, no bundler.** Do not introduce one.
- Google Fonts only (Space Grotesk, Inter, JetBrains Mono), loaded from the CDN.
- Everything is one page: `index.html`, `style.css`, `script.js`, `assets/showcase/*.webp`.
- Deploy = `git push origin main`; GitHub Pages builds it. No CI.

## File map

| File | Role |
| --- | --- |
| `index.html` | All markup: sticky header + nav, every section, footer, screenshot lightbox. One small inline `<script>` for the CodeSnap share button. |
| `style.css` | All styling. Design tokens live in `:root` (dark theme, `--accent:#9B6BF9`). |
| `script.js` | Hash router (`render()`), mobile nav, screenshot showcase + lightbox, contact form, "Read more" toggle. |
| `assets/showcase/1..5.webp` | App screenshots, 350×759, injected by `script.js`. |
| `.gitignore` | Keeps agent verification screenshots (`_*.png`, `shot*.png`, …) out of the repo. Never force-add them. |

## Routing contract — do not break

Hash-based routing, driven by `routes` and `render()` at the top of `script.js`:

- Sections: `#home`, `#about`, `#contact`, `#app-codesnap`, `#app-codesnap-privacy`, `#app-codesnap-terms`
- Aliases: `#privacy` → the privacy section; `#app-codesnap-whats-new` → the app section, then smooth-scrolls to `#whats-new`
- Unknown hash falls back to `#home`
- Only `render()` toggles `section.active`; sections are `display:none` otherwise

**The Android app deep-links to exactly these URLs** (from `AboutHelper.kt` in the CodeSnap repo), so they are a public contract:

```
https://studio-northline.github.io/website/#privacy
https://studio-northline.github.io/website/#app-codesnap-terms
https://studio-northline.github.io/website/#app-codesnap-whats-new
```

The repo moved from `HadiAwali` to the `Studio-Northline` org, so `hadiawali.github.io/website/*` now 404s. **`AboutHelper.kt` in the CodeSnap repo still points at the old URLs and must be updated**, or the in-app Privacy Policy / Terms / What's new links stay broken.

## Header / responsive nav

- ≥681px wide: inline `Home · About · Contact` links, hamburger button hidden.
- ≤680px: `.nav-toggle` hamburger replaces them; `#nav` becomes a full-screen fixed overlay toggled with the `.open` class. Big numbered links (`01`/`02`/`03`) stagger in; the logo and toggle sit above it via `z-index:2`.
- Toggle logic in `script.js` (nav id `navToggle`): click to open, and it closes on link click, backdrop tap (`e.target === navMenu`), `Escape` (focus returns to the button), logo click, and on resize past the breakpoint. Open state also sets `body.nav-locked` (scroll lock only).
- The header's blur lives on `header::before`, **never** on `header` itself. A `backdrop-filter` on `header` would make it the containing block for the overlay's `position:fixed`, so the full-screen menu collapses into the header's box the instant it starts fading out. Keep `header` free of `backdrop-filter`/`filter`/`transform`.
- The breakpoint exists in **two** places that must stay in sync: the `@media (max-width:680px)` block in `style.css` and the `window.innerWidth > 680` check in `script.js`.
- `header` is `position:sticky`; the overlay is `position:fixed` against the viewport (the logo/toggle stay clickable above it because they get `z-index:2` inside the header's stacking context).

## Conventions

- Styling through the CSS variables in `:root`; don't hardcode colors.
- Commit messages in history use a short lowercase scope prefix plus an imperative summary: `ui:`, `content:`, `style:`, `chore:`, `header:`.
- Keep copy human and plain — earlier passes deliberately de-formalized the text.
- The site speaks in the first-person plural: **we / us / our**. Never `I`, `me`, `my`, `myself`, and never describe the studio as one person, solo, or "just me".
- Fixed contact/links: `northline.studio.developer@gmail.com`, Play Store id `com.hadiawali.codesnap`, GitHub `HadiAwali`.
- **Always push when the work is done** — commit with the scoped prefix and `git push origin main` without asking. Don't leave changes sitting in the working tree.

## Verifying changes

No test suite. Before pushing:

1. Open `index.html` directly (`file://`) or serve the folder with any static server.
2. Check both a 390px and a 1280px viewport: hamburger open/close on narrow, inline links on wide.
3. Confirm `#privacy`, `#app-codesnap-terms`, and `#app-codesnap-whats-new` still land on the right section.
4. After pushing, Pages deploys in about a minute: <https://studio-northline.github.io/website/>
