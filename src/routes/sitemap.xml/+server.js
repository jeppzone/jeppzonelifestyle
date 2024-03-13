// @ts-nocheck
export const prerender = true;
export async function GET({ fetch, setHeaders }) {
	setHeaders({
		'Content-Type': 'application/xml'
	});

	const site = 'https://www.jeppzonelifestyle.com';
	const response = await fetch('api/posts');
	const posts = await response.json();

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
                <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                <url>
                <loc>${site}</loc>
                <changefreq>daily</changefreq>
                <priority>0.7</priority>
                </url>
                ${posts
									.map(
										(post) => `
                <url>
                <loc>${site}/posts/${post.slug}</loc>
                <changefreq>weekly</changefreq>
                <lastmod>${post.date}</lastmod>
                </url>
                `
									)
									.join('')}
                </urlset>`;
	return new Response(sitemap);
}
