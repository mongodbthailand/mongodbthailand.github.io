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
      social: [
        {
          icon: 'facebook',
          label: 'facebook',
          href: 'https://www.facebook.com/groups/mongodbthailand/',
        },
        {
          icon: 'youtube',    
          label: 'youtube',
          href: 'https://www.youtube.com/channel/UCTBf047qtAST4RXhYM61vVg',
        },
        {
          icon: 'github',
          label: 'github',
          href: 'https://github.com/mongodbthailand',
        },
      ],
      sidebar: [
        {
          label: 'Tutorials',
          autogenerate: { directory: 'tutorials' },
        },
        {
          label: 'Guides',
          autogenerate: { directory: 'guides' },
        },
        {
          label: 'Hacktoberfest',
          items: [
            { label: 'แนะนำเบื้องต้น', link: '/hacktoberfest' },
            { label: 'เริ่มเขียนและส่งคอนเทนต์', link: '/hacktoberfest/getting-start' },
            { label: 'Mongoberfest', link: '/hacktoberfest/event' },
          ],
        },
      ],
      customCss: ['./src/tailwind.css'],
    }),
    tailwind({ applyBaseStyles: false }),
  ],
});
