# mongodbthailand.com Website

[![Deploy to GitHub Pages](https://github.com/mongodbthailand/mongodbthailand.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/mongodbthailand/mongodbthailand.github.io/actions/workflows/deploy.yml)

โปรเจกต์นี้สำหรับเก็บซอร์สโค้ดของเว็บไซต์ [MongoDB Thailand](https://mongodbthailand.com) เว็บไซต์รวบรวมข้อมูลและคำแนะนำการใช้งาน MongoDB
สำหรับคอมมูนิตี้ชาวไทย

## Hacktoberfest

ปัจจุบันโครงการนี้เปิดรับ MR เพื่อเพิ่มคอนเทนต์ที่น่าสนใจ สามารถติดตามรายละเอียดเพิ่มเติมได้ที่
[หน้ารายละเอียดกิจกรรม Hacktoberfest](https://mongodbthailand.com/hacktoberfest)

## สำหรับนักพัฒนาและผู้ร่วมแก้ไข

เพื่อให้โปรเจกต์นี้มีรูปแบบการย่อหน้าที่ตรงกัน กรุณาลง Extension [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) ในโปรแกรมแก้ไขโค้ดของท่าน

คู่มือสำหรับการพัฒนาเพิ่มเติมดูได้ที่ [DEVELOPMENT.md](./DEVELOPMENT.md)

## 🚀 Project Structure

Inside of your Astro + Starlight project, you'll see the following folders and files:

```ini
.
├── public/
├── src/
│   ├── assets/
│   ├── content/
│   │   ├── docs/
│   │   └── config.ts
│   └── env.d.ts
├── astro.config.mjs
├── package.json
├── tailwind.config.cjs
└── tsconfig.json
```

Starlight looks for `.md` or `.mdx` files in the `src/content/docs/` directory. Each file is exposed as a route based on its file name.

Images can be added to `src/assets/` and embedded in Markdown with a relative link.

Static assets, like favicons, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [Starlight’s docs](https://starlight.astro.build/), read [the Astro documentation](https://docs.astro.build), or jump into the [Astro Discord server](https://astro.build/chat).
