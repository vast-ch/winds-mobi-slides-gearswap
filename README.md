# winds-mobi-slides-gearswap

Self-running [Slidev](https://sli.dev) deck with winds.mobi stats, made to loop on a screen without a speaker.

```sh
pnpm install
pnpm dev     # http://localhost:3031
pnpm build   # static site in dist/
```

## GitHub Pages

`pnpm build:pages` builds the deck into `docs/` for `https://<owner>.github.io/winds-mobi-slides-gearswap/`.
Commit `docs/`, then in the repo settings set Pages to deploy from the `main` branch, `/docs` folder.
Rebuild and commit `docs/` again after every change to the slides. If the repo is renamed, change
the `--base` path in the `build:pages` script to match.

- Slides advance every 10 s and loop forever. A slide can set `advanceAfter: <seconds>`, or
  `advanceAfterVideo: <seconds>` to advance that long after its video ends (see `global-top.vue`).
- Corner branding and the Discord QR code live in `global-top.vue`; the sky and mountains in
  `global-bottom.vue` and `style.css`; chart colours in `setup/mermaid.ts`.
- Drop a vast.ch logo at `public/vast-logo.svg` and it appears in the bottom-left corner.
- Traffic numbers come from the GoAccess report at reports.winds.mobi (19 Sep - 9 Oct 2026).

Build workarounds: `@slidev/cli` is pinned to 52.20.1 with `markdown-it@^14` as a direct dependency
(Slidev 53 pulls an incompatible markdown-it 15), and `vite.config.ts` disables CSS minification to
avoid an upstream CSS parse error.
