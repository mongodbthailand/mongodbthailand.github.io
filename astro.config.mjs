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
			social: {
				facebook: 'https://www.facebook.com/groups/mongodbthailand/',
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
						{ label: 'คำแนะนำในการเข้าร่วม', link: '/hacktoberfest-2023' },
					],
				},
			],
			customCss: ['./src/tailwind.css'],
		}),
		tailwind({ applyBaseStyles: false }),
	],
});

