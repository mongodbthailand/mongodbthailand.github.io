import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://mongodbthailand.com',
  base: '/',
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
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Example Guide', link: '/guides/example/' },
          ],
        },
        {
          label: 'Hacktoberfest 2023',
          items: [
            { label: 'แนะนำเบื้องต้น', link: '/hacktoberfest-2023' },
            { label: 'เริ่มเขียนและส่งคอนเทนต์', link: '/hacktoberfest-2023/getting-start' },
            { label: 'Mongoberfest 2023', link: '/hacktoberfest-2023/event' },
          ],
        },
      ],
      customCss: ['./src/tailwind.css'],
    }),
    tailwind({ applyBaseStyles: false }),
  ],
});
