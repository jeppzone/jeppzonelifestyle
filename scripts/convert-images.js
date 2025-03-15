const sharp = require('sharp');
const glob = require('glob');
const fs = require('fs').promises;

async function convertToWebP() {
	try {
		// Find all images in the static directory
		const images = glob.sync('static/**/*.{jpg,jpeg,png}');

		for (const image of images) {
			const outputPath = image.replace(/\.(jpg|jpeg|png)$/i, '.webp');

			// Skip if WebP version already exists
			try {
				await fs.access(outputPath);
				console.log(`Skipping ${image} - WebP version already exists`);
				continue;
			} catch {
				// File doesn't exist, proceed with conversion
			}

			await sharp(image).webp({ quality: 80 }).toFile(outputPath);

			console.log(`Converted ${image} to WebP`);
		}

		console.log('Image conversion complete!');
	} catch (error) {
		console.error('Error converting images:', error);
		process.exit(1);
	}
}

convertToWebP();
