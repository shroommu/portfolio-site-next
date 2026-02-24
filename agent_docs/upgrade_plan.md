# Portfolio Site Upgrade Plan

Date: 2026-02-24
Repository: `shroommu/portfolio-site-next` (branch: `dev`)

## Goal
Improve accessibility, reliability, maintainability, and delivery confidence while preserving the existing UI and Pages Router architecture.

## Step 1 — Accessibility and semantic correctness (Now)
**Scope**
- Make header/menu interactions keyboard and screen-reader friendly.
- Ensure form labels are correctly associated with controls.
- Keep visuals unchanged.

**Tasks**
- In `src/components/shared/Header.js`:
  - Replace clickable icon-only elements with real `button` controls.
  - Add `aria-label`, `aria-expanded`, and `aria-controls` to mobile menu toggle.
- In `src/components/Nav/Menu.js`:
  - Ensure list semantics are valid (`ul > li > a`).
  - Add menu container id referenced by header toggle.
- In form components:
  - Wire stable ids from `src/pages/contact/index.js` into `src/components/Input.js` and `src/components/TextArea.js`.
  - Keep `htmlFor` in `src/components/LabeledElement.js` bound to those ids.

**Validation**
- `npm run test -- src/tests/pages/contact.test.js`
- `npm run lint`
- Manual keyboard pass on mobile menu and contact form.

---

## Step 2 — Contact API hardening
**Scope**
- Strengthen abuse resistance and operational reliability of `src/pages/api/contact.js`.

**Tasks**
- Add lightweight per-IP rate limiting.
- Add strict request body guard (types/length limits).
- Add timeout around SMTP send and safe server-side logging.
- Preserve existing API response shape for UI compatibility.

**Validation**
- Existing contact page tests still pass.
- Add/adjust API route tests for 400/405/429/success paths.

---

## Step 3 — CI quality gate improvements
**Scope**
- Ensure pull requests run tests in CI, not only lint/build.

**Tasks**
- Update `.github/workflows/ci.yml` to run `npm test -- --ci`.
- Optionally add coverage threshold once stable.

**Validation**
- CI passes on open PR with lint + test + build.

---

## Step 4 — Dependency and package hygiene
**Scope**
- Remove unnecessary dependencies and reduce install/runtime risk.

**Tasks**
- Remove built-in module package shims from `package.json` (e.g., `fs`).
- Re-audit unused runtime dependencies.
- Regenerate lockfile and verify scripts.

**Validation**
- `npm ci`, `npm run lint`, `npm run build`, `npm test` all pass.

---

## Step 5 — Shared page composition cleanup
**Scope**
- Reduce duplication between blog/projects index and slug pages.

**Tasks**
- Extract shared MDX page rendering utilities used by:
  - `src/pages/blog/index.js`
  - `src/pages/projects/index.js`
  - `src/pages/blog/[slug].js`
  - `src/pages/projects/[slug].js`
- Keep route behavior and URLs unchanged.

**Validation**
- All affected page tests pass.
- No visual regressions in blog/projects pages.

---

## Step 6 — Runtime performance polish
**Scope**
- Improve client performance without changing layout.

**Tasks**
- Add cleanup/guards for resize listeners in `src/components/shared/Background.js`.
- Consider dynamic import for heavy decorative components.
- Re-check hero image priority usage.

**Validation**
- Build passes and no hydration/runtime warnings.

---

## Step 7 — Documentation refresh
**Scope**
- Keep onboarding and operations docs aligned with actual architecture.

**Tasks**
- Update `README.md` to reflect current routes, MDX workflow, and contact env vars.
- Add short “quality gates” section with local pre-PR commands.

**Validation**
- New contributor can run app and tests from README only.

## Definition of Done
- `npm run lint` passes.
- `npm test` passes.
- `npm run build` passes.
- Core routes and contact submission work as expected.
