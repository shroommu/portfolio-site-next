# Portfolio Site Upgrade Plan

Date: 2026-02-24
Repository: `shroommu/portfolio-site-next` (branch: `dev`)

## Goal
Improve reliability, accessibility, maintainability, and performance while keeping the current visual design and Pages Router architecture.

## Current Snapshot
- Framework: Next.js 13 (Pages Router)
- Styling: styled-components + global CSS
- Content: MDX files in `_posts` and `_projects`
- Gaps observed: dependency/docs drift, duplicated MDX data pipeline, accessibility issues, minimal quality tooling, and contact form robustness concerns.

## Priority 1 (High Impact, Low-Medium Effort)

### 1) Clean dependency and documentation drift
**Why**
- Unused/legacy dependencies increase maintenance risk and install time.
- README does not reflect real architecture, slowing onboarding.

**Actions**
- Audit and remove unused dependencies from `package.json` (e.g., `fs`, `stream`, potentially `next-images`, `csv-loader` if not used).
- Ensure only required runtime deps remain.
- Rewrite `README.md` to describe:
  - Pages Router structure (`src/pages`)
  - MDX content folders (`_posts`, `_projects`)
  - local dev/build/deploy steps

**Validation**
- `npm install` completes cleanly.
- `npm run lint` and `npm run build` succeed.

---

### 2) Accessibility and semantic fixes
**Why**
- Several patterns reduce keyboard/screen-reader compatibility and test consistency.

**Actions**
- Replace `test-id` with `data-testid` across components/pages.
- In `LabeledElement`, replace `for` with `htmlFor`.
- Reduce risky global reset side effects in `global.css`:
  - Avoid broad `all: unset` on interactive elements globally.
  - Keep intended visual style with explicit component styling.
- Review empty image `alt` usage and provide meaningful alt text where content is informative.

**Validation**
- Run lint and manually verify keyboard navigation in header/menu/cards/form.

---

### 3) Contact form hardening
**Why**
- Direct client-side post to public endpoint with `XMLHttpRequest` has weak UX and maintainability.

**Actions**
- Migrate submit logic to `fetch` with explicit `loading/success/error` states.
- Route submit through a Next API route (`src/pages/api/contact.js`) so endpoint details/secrets are not directly embedded in UI code.
- Add submit button disable while loading and clearer error message path.
- Optionally add basic anti-spam measure (honeypot or lightweight verification).

**Validation**
- Success and failure scenarios are both handled and visible to the user.

## Priority 2 (Maintainability + Consistency)

### 4) Extract shared MDX content utilities
**Why**
- Blog and Projects pages duplicate file discovery, serialization, and slug handling.

**Actions**
- Create a shared utility module (e.g., `src/lib/content.js`) for:
  - listing MDX files by folder
  - loading serialized content + frontmatter
  - generating previews and slug paths
- Refactor:
  - `src/pages/blog/index.js`
  - `src/pages/projects/index.js`
  - `src/pages/blog/[slug].js`
  - `src/pages/projects/[slug].js`

**Validation**
- Page output remains identical while code duplication is reduced.

---

### 5) Remove debug/dead code and tighten behavior
**Why**
- Stray logs and unused imports add noise and may impact production behavior.

**Actions**
- Remove `console.log(show)` from `src/components/Nav/Menu.js`.
- Remove or use unused imports/components (e.g., `FallingLeaves` in `_app.js` if not rendered).
- Convert external profile links from `http` to `https`.
- Make footer year dynamic instead of hardcoded.

**Validation**
- No console noise in production build.

## Priority 3 (Performance + Quality Foundation)

### 6) Image and rendering performance pass
**Why**
- Overuse of priority loading can hurt LCP and overall page performance.

**Actions**
- Restrict `priority` to above-the-fold hero imagery only.
- Keep card images lazy by default.
- Verify image sizing behavior is stable across breakpoints.

**Validation**
- Lighthouse/Web Vitals improve (especially LCP and CLS where applicable).

---

### 7) Add baseline project quality tooling
**Why**
- No tests/CI/formatter increases regression risk.

**Actions**
- Add formatter config (Prettier) and optional lint-staged.
- Add basic test setup for core rendering paths (at minimum smoke tests for key pages/components).
- Add GitHub Actions workflow to run install + lint + build.

**Validation**
- CI runs on PRs and blocks obvious regressions.

## Suggested Execution Order
1. Dependency/doc cleanup
2. Accessibility semantics fixes
3. Contact form hardening
4. MDX utility extraction
5. Cleanup/debug removal
6. Image performance pass
7. Tooling + CI

## Risks / Notes
- CSS reset changes can alter existing look/feel; verify visual parity page by page.
- MDX refactor touches routing/data code in multiple pages; keep changes incremental.
- Contact API migration may require environment configuration and endpoint contract checks.

## Definition of Done
- `npm run lint` passes.
- `npm run build` passes.
- Core routes (`/`, `/blog`, `/blog/[slug]`, `/projects`, `/projects/[slug]`, `/contact`) function as before or better.
- Contact form has robust success/failure UX.
- README accurately documents architecture and workflows.
