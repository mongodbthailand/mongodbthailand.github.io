import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://mongodbthailand.com',
  integrations: [
    starlight({
      title: 'MongoDB Thailand',
      favicon: '/favicon.ico',
      defaultLocale: 'th',
      lastUpdated: true,
      editLink: {
        baseUrl: 'https://github.com/mongodbthailand/mongodbthailand.github.io/edit/main/',
      },
      social: {
        facebook: 'https://www.facebook.com/groups/mongodbthailand/',
        youtube: 'https://www.youtube.com/channel/UCTBf047qtAST4RXhYM61vVg',
        github: 'https://github.com/mongodbthailand',
      },
      sidebar: [
        {
          label: 'Guides',
          autogenerate: { directory: 'guides' },
        },
        {
          label: 'Hacktoberfest 2025',
          items: [
            { label: 'แนะนำเบื้องต้น', link: '/hacktoberfest-2025' },
            { label: 'เริ่มเขียนและส่งคอนเทนต์', link: '/hacktoberfest-2025/getting-start' },
            { label: 'Mongoberfest 2025', link: '/hacktoberfest-2025/event' },
          ],
        },
      ],
      customCss: ['./src/tailwind.css'],
    }),
    tailwind({ applyBaseStyles: false }),
  ],
});
