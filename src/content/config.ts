import { z, defineCollection } from 'astro:content';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		schema: docsSchema({
			extend: ({ image }) =>
				z.object({
					description: z
						.string()
						.min(50, 'Description should be at least 50 characters')
						.max(160, 'Description should be at most 160 characters'),
					keywords: z
						.array(z.string().min(2).max(40))
						.min(3, 'Add at least 3 keywords')
						.max(10, 'Use up to 10 keywords'),
					canonical: z.string().url().optional(),
					ogImage: image().optional(),
					meta: z.object({
						author: z.string().min(2).max(80),
						language: z.enum(['th', 'en']),
					}),
				}),
		}),
	}),
	i18n: defineCollection({ type: 'data', schema: i18nSchema() }),
};
