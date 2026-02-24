# Dependency Audit Triage

Date: 2026-02-24

## Scope
- Command: `npm audit --omit=dev --json`
- Purpose: triage production dependency risks and define upgrade order.

## Summary
- Total vulnerabilities: 3
- Critical: 0
- High: 1
- Moderate: 2
- Low: 0

## Changes applied during triage
- Moved build/lint tooling from runtime to dev dependencies:
   - `eslint`
   - `eslint-config-next`
   - `@svgr/webpack`
   - `autoprefixer`
- Upgraded framework and lint stack:
   - `next` → `16.1.6`
   - `next-mdx-remote` → `6.0.0`
   - `eslint-config-next` → `16.1.6`
   - `eslint` → `9.39.3`
- Added `eslint.config.mjs` (flat config) and updated scripts for Next 16:
   - `lint`: `eslint .`
   - `dev`: `next dev --webpack`
   - `build`: `next build --webpack`
- Outcome: reduced production audit exposure from 18 issues (1 critical / 10 high) to 3 issues (0 critical / 1 high).

## Remaining priority finding
1. `tar-fs` chain (transitive high)
   - Comes through transitive dependency tree (not directly declared).
   - Recommended action: apply `npm audit fix` and recheck lockfile impact.

## Notes
- Remaining moderate findings are transitive (`lodash`, `nanoid`).
- No remaining direct production critical vulnerabilities after framework upgrades.

## Recommended next action
1. Run `npm audit fix` and validate lockfile/test/build.
2. Re-run `npm audit --omit=dev --json` and confirm the remaining high issue is cleared.