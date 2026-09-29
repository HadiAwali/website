# AGENTS.md — Hadi Studio website

## What this project is

A static, single-page marketing/legal site for **Hadi Studio** (Hadi Awali's solo Android app brand). It holds:

- the studio home / About / Contact sections,
- a Play-Store-style listing for the **CodeSnap** app (screenshots, What's new, About this app),
- the app's **hosted Privacy Policy and Terms of Service**, which the Android app opens in a browser tab.

Live at <https://hadiawali.github.io/website/> (GitHub Pages, deployed from `main`).
Repo: <https://github.com/HadiAwali/website> — local clone: `C:\Users\hadir\AndroidStudioProjects\website`.

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
| `style.css` | All styling. Design tokens live in `:root` (dark theme, `--accent:#8C6FFF`). |
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
https://hadiawali.github.io/website/#privacy
https://hadiawali.github.io/website/#app-codesnap-terms
https://hadiawali.github.io/website/#app-codesnap-whats-new
```

## Header / responsive nav

- ≥681px wide: inline `Home · About · Contact` links, hamburger button hidden.
- ≤680px: `.nav-toggle` hamburger replaces them; `#nav` becomes a floating dropdown card toggled with the `.open` class.
- Toggle logic in `script.js` (nav id `navToggle`): click to open, and it closes on link click, outside click, `Escape` (focus returns to the button), and on resize past the breakpoint.
- The breakpoint exists in **two** places that must stay in sync: the `@media (max-width:680px)` block in `style.css` and the `window.innerWidth > 680` check in `script.js`.
- `header` is `position:sticky`; the dropdown is absolutely positioned against it.

## Conventions

- Styling through the CSS variables in `:root`; don't hardcode colors.
- Commit messages in history use a short lowercase scope prefix plus an imperative summary: `ui:`, `content:`, `style:`, `chore:`, `header:`.
- Keep copy human and plain — earlier passes deliberately de-formalized the text.
- Fixed contact/links: `developer.hadiawali@gmail.com`, Play Store id `com.hadiawali.codesnap`, GitHub `HadiAwali`.

## Verifying changes

No test suite. Before pushing:

1. Open `index.html` directly (`file://`) or serve the folder with any static server.
2. Check both a 390px and a 1280px viewport: hamburger open/close on narrow, inline links on wide.
3. Confirm `#privacy`, `#app-codesnap-terms`, and `#app-codesnap-whats-new` still land on the right section.
4. After pushing, Pages deploys in about a minute: <https://hadiawali.github.io/website/>
