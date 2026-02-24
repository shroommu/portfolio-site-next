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

## Available scripts

- `npm run dev` — start dev server
- `npm run build` — build production bundle
- `npm run start` — run production server
- `npm run lint` — run Next.js ESLint checks

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
