# portfolio-site-next

Personal portfolio site built with Next.js (Pages Router), styled-components, and MDX content files.

## Stack

- Next.js 13 (Pages Router)
- React 18
- styled-components
- MDX via `next-mdx-remote`

## Project structure

- `src/pages/` — route pages (`/`, `/blog`, `/projects`, `/contact`, etc.)
- `_posts/` — blog post MDX files
- `_projects/` — project post MDX files
- `src/components/` — shared UI components
- `public/assets/` — static images, icons, SVG assets, and fonts

## Getting started

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Contact form email setup

The contact API route sends email directly through SMTP.

Set these environment variables (for local dev in `.env.local`):

- `SMTP_HOST` (example: `smtp.sendgrid.net`)
- `SMTP_PORT` (example: `587`)
- `SMTP_SECURE` (`true` for SSL/TLS, usually `false` on port `587`)
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_TO_EMAIL` (inbox that receives contact messages)
- `CONTACT_FROM_EMAIL` (sender address used by your SMTP provider)

`CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` default to `SMTP_USER` if omitted.

## Available scripts

- `npm run dev` — start dev server
- `npm run build` — build production bundle
- `npm run start` — run production server
- `npm run lint` — run Next.js ESLint checks
- `npm test` — run Jest test suite
- `npm run test:ci` — run Jest in CI mode with coverage thresholds
- `npm run audit:prod` — run production dependency audit
- `npm run audit:prod:high` — fail when high/critical production vulnerabilities are found

## Quality gates

Pull requests run these checks in CI:

- `npm run lint`
- `npm run test:ci`
- `npm run build`

Run the same checks locally before opening a PR:

```bash
npm run lint
npm test
npm run build
```

## Content workflow

- Add a blog post by creating a new `.mdx` file in `_posts/`.
- Add a project entry by creating a new `.mdx` file in `_projects/`.
- File name becomes the route slug.
- Frontmatter fields are used for card preview metadata and page titles.

## Deployment

Deploy as a standard Next.js app.

```bash
npm run build
npm run start
```
