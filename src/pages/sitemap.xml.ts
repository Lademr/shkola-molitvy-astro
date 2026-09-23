import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const lessons = await getCollection('lessons');
  const posts = await getCollection('blog');
  const baseUrl = 'https://shkola-molity.ru';

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/lessons', priority: '0.9', changefreq: 'weekly' },
    { url: '/blog', priority: '0.8', changefreq: 'weekly' },
    { url: '/prayers', priority: '0.7', changefreq: 'monthly' },
    { url: '/scripture', priority: '0.7', changefreq: 'monthly' },
    { url: '/quiz', priority: '0.7', changefreq: 'monthly' },
    { url: '/diary', priority: '0.6', changefreq: 'monthly' },
    { url: '/feedback', priority: '0.5', changefreq: 'monthly' },
    { url: '/about', priority: '0.6', changefreq: 'monthly' },
    { url: '/authors', priority: '0.6', changefreq: 'monthly' },
    { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
    { url: '/terms', priority: '0.3', changefreq: 'yearly' },
  ];

  const lessonUrls = lessons.map((lesson) => {
    const match = lesson.slug.match(/^(\d+)-(.+)$/);
    const id = match ? match[1] : lesson.slug;
    const name = match ? match[2] : lesson.slug;
    return {
      url: `/lessons/${id}/${name}`,
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: lesson.data.dateModified,
    };
  });

  const postUrls = posts.map((post) => ({
    url: `/blog/${post.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: post.data.dateModified,
  }));

  const allUrls = [...staticPages, ...lessonUrls, ...postUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (p) => `  <url>
    <loc>${baseUrl}${p.url}</loc>
    ${'lastmod' in p && p.lastmod ? `<lastmod>${p.lastmod}</lastmod>` : ''}
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
