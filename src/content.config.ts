import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Pointing to the new 'src/data/blog' folder to avoid legacy 'src/content' magic
	loader: glob({ pattern: "**/*.md", base: "./src/data/blog" }),
	schema: z.object({
		title: z.string(),
		date: z.string(),
		image: z.string().optional(),
		category: z.enum(['food', 'travel', 'informal-experience']),
	}),
});

export const collections = { blog };
