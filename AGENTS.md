# AGENTS.md

Single-package TypeScript library. All public types and type guards live in
`src/index.ts`; tests are colocated in `src/index.test.ts`.

## Setup

- Uses pnpm; `pnpm-lock.yaml` is committed. Run `pnpm install` after checkout.
- `.npmrc` pins the registry to `https://registry.npmmirror.com`.

## Commands

- `pnpm run test` — run the vitest suite.
- `pnpm run test:coverage` — run with v8 coverage (`coverage/lcov.info`).
- `pnpm run test:watch` — watch mode.
- `pnpm exec vitest run src/index.test.ts` — one file;
  `pnpm exec vitest run -t "<name>"` — one test.
- `pnpm run typecheck` — `tsc --noEmit`.
- `pnpm run lint` — oxlint.
- `pnpm run format` / `pnpm run format:check` — oxfmt.
- `pnpm run build` — clean, then emit `dist/index.js` and `dist/index.d.ts`.
- `pnpm run clean` — remove `dist` and `coverage`.

## Conventions

- Tests are table-driven: add cases to the `cases` arrays in `src/index.test.ts`
  rather than writing new `it()` blocks.
- 4-space indentation (`.editorconfig`); `package.json` uses 2 spaces.
- Style is enforced by oxfmt, not oxlint; keep lint rules focused on correctness.
