<!-- OptimizedImage.svelte -->
<script lang="ts">
	export let src: string;
	export let alt: string;
	export let width: string | number = 'auto';
	export let height: string | number = 'auto';
	export let className = '';
	export let loading: 'lazy' | 'eager' = 'lazy';

	// Function to get WebP version if available
	function getWebPUrl(url: string): string {
		if (url.includes('.webp')) return url;
		const urlObj = new URL(url, 'https://jeppzone.com');
		const path = urlObj.pathname;
		return path.replace(/\.(jpg|jpeg|png)$/i, '.webp');
	}

	const webpSrc = getWebPUrl(src);
</script>

<picture class={className}>
	<source srcset={webpSrc} type="image/webp" />
	<img
		{src}
		{alt}
		{loading}
		style="width: {typeof width === 'number' ? `${width}px` : width}; height: {typeof height ===
		'number'
			? `${height}px`
			: height};"
		class="max-w-full h-auto"
	/>
</picture>

<style>
	img {
		object-fit: cover;
		transition: opacity 0.3s ease-in-out;
	}

	img[loading] {
		opacity: 0;
	}

	img:not([loading]) {
		opacity: 1;
	}
</style>
