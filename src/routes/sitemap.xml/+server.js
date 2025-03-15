// @ts-nocheck
export const prerender = true;

const pages = [
	{
		url: '/',
		changefreq: 'daily',
		priority: 1.0
	},
	{
		url: '/tools',
		changefreq: 'weekly',
		priority: 0.8
	},
	{
		url: '/posts',
		changefreq: 'daily',
		priority: 0.9
	},
	{
		url: '/tools/child-height-calculator',
		changefreq: 'monthly',
		priority: 0.7
	},
	{
		url: '/tools/bmi-calculator',
		changefreq: 'monthly',
		priority: 0.7
	}
];

export async function GET({ fetch, setHeaders }) {
	setHeaders({
		'Content-Type': 'application/xml',
		'Cache-Control': 'max-age=0, s-maxage=3600'
	});

	const baseUrl = 'https://www.jeppzonelifestyle.com';
	const response = await fetch('api/posts');
	const posts = await response.json();

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
				xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
				xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
				xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
				http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
			${pages
				.map(
					(page) => `
				<url>
					<loc>${baseUrl}${page.url}</loc>
					<changefreq>${page.changefreq}</changefreq>
					<priority>${page.priority}</priority>
					<lastmod>${new Date().toISOString()}</lastmod>
				</url>`
				)
				.join('')}
			${posts
				.map(
					(post) => `
				<url>
					<loc>${baseUrl}/posts/${post.slug}</loc>
					<changefreq>weekly</changefreq>
					<priority>0.6</priority>
					<lastmod>${post.date}</lastmod>
					${
						post.image
							? `
					<image:image>
						<image:loc>${baseUrl}${post.image}</image:loc>
						<image:title>${post.title}</image:title>
					</image:image>
					`
							: ''
					}
				</url>`
				)
				.join('')}
		</urlset>`;

	return new Response(sitemap);
}
