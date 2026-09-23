import { defineCollection, z } from 'astro:content';

const lessons = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    level: z.string(),
    duration: z.string(),
    datePublished: z.string(),
    dateModified: z.string(),
    author: z.string(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    datePublished: z.string(),
    dateModified: z.string(),
    keywords: z.array(z.string()).optional(),
    category: z.string().optional(),
  }),
});

export const collections = { lessons, blog };
