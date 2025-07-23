import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputFile = join(__dirname, '../public/logo.svg');
const publicDir = join(__dirname, '../public');

async function generateFavicons() {
  try {
    // Create PNG versions in different sizes
    const sizes = [16, 32, 48, 64, 128, 256];
    const pngPromises = sizes.map(size => 
      sharp(inputFile)
        .resize(size, size)
        .png()
        .toFile(join(publicDir, `favicon-${size}x${size}.png`))
    );

    // Generate apple-touch-icon (180x180 is standard)
    const appleTouchIcon = sharp(inputFile)
      .resize(180, 180)
      .png()
      .toFile(join(publicDir, 'apple-touch-icon.png'));

    // Generate favicon.png (32x32) instead of .ico
    const faviconPng = sharp(inputFile)
      .resize(32, 32)
      .png()
      .toFile(join(publicDir, 'favicon.png'));

    // Wait for all operations to complete
    await Promise.all([...pngPromises, appleTouchIcon, faviconPng]);

    console.log('✅ Favicon generation completed successfully!');
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
  }
}

generateFavicons(); 