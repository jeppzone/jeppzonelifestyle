// @ts-nocheck
export const prerender = true;
export async function GET({ fetch, setHeaders }) {
	setHeaders({
		'Content-Type': 'application/xml'
	});

	const sites = [
		'https://www.jeppzonelifestyle.com',
		'https://www.jeppzonelifestyle.com/tools/child-height-calculator',
		'https://www.jeppzonelifestyle.com/posts'
	];
	const baseUrl = 'https://www.jeppzonelifestyle.com';
	const response = await fetch('api/posts');
	const posts = await response.json();

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
                <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${sites
									.map(
										(site) => `<url>
                <loc>${site}</loc>
                <changefreq>daily</changefreq>
                <priority>0.7</priority>
                </url>`
									)
									.join('')}
                ${posts
									.map(
										(post) => `
                <url>
                <loc>${baseUrl}/posts/${post.slug}</loc>
                <changefreq>weekly</changefreq>
                <lastmod>${post.date}</lastmod>
                </url>
                `
									)
									.join('')}
                </urlset>`;
	return new Response(sitemap);
}
