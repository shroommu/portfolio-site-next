# Dependency Audit Triage

Date: 2026-02-24

## Scope
- Command: `npm audit --omit=dev --json`
- Purpose: triage production dependency risks and define upgrade order.

## Summary
- Total vulnerabilities: 7
- Critical: 1
- High: 2
- Moderate: 3
- Low: 1

## Changes applied during triage
- Moved build/lint tooling from runtime to dev dependencies:
   - `eslint`
   - `eslint-config-next`
   - `@svgr/webpack`
   - `autoprefixer`
- Outcome: reduced production audit exposure from 18 issues (1 critical / 10 high) to 7 issues (1 critical / 2 high).

## Priority findings
1. `next` (direct, critical)
   - Reported vulnerable range includes current `13.5.2`.
   - Recommended action: plan framework upgrade path to a fixed `next` release.

2. `next-mdx-remote` (direct high)
   - Current `4.4.1`, fix available is semver-major (`6.0.0`).
   - Recommended action: upgrade in same window as Next framework migration.

3. `tar-fs` chain (transitive high)
   - Comes through transitive dependency tree (not directly declared).
   - Recommended action: re-run audit after Next/MDX upgrades and apply non-breaking `npm audit fix` updates.

## Notes
- Remaining moderate/low findings are transitive (`diff`, `js-yaml`, `lodash`, `nanoid`).
- Many residual issues are expected to shrink after direct framework upgrades.

## Recommended rollout
1. Upgrade `next` with smoke + route tests.
2. Upgrade `next-mdx-remote` and verify MDX build/runtime rendering.
3. Apply `npm audit fix` for non-breaking transitive updates.
4. Re-run `npm audit --omit=dev --json` and compare counts.