# Development Guide

This project is built with Astro and Starlight.

## Prerequisites

- Node.js 18 or newer
- npm 9 or newer

## Install Dependencies

```bash
npm install
```

## Run in Development Mode

```bash
npm run dev
```

The local dev server starts at `http://localhost:4321`.

## Build for Production

```bash
npm run build
```

Build output is generated in the `dist/` directory.

## Preview Production Build

```bash
npm run preview
```

## Content Editing Checklist

- Use frontmatter fields: `title`, `description`, `keywords`, `meta.author`, `meta.language`
- Add meaningful alt text for every image
- Keep descriptions concise and user-focused
- Prefer Thai language content unless the article is specifically English

## Formatting

- Follow `.editorconfig` settings
- Keep line endings as LF
- Use UTF-8 encoding
