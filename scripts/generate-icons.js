const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function generateIcons() {
  const svgBuffer = await fs.readFile(path.join(__dirname, '../public/safari-pinned-tab.svg'));
  
  // Generate different sizes
  const sizes = [16, 32, 48, 64, 128, 192, 512];
  
  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(__dirname, `../public/icon-${size}.png`));
    
    console.log(`Generated ${size}x${size} icon`);
  }

  // Generate apple-icon.png
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(__dirname, '../public/apple-icon.png'));
  
  console.log('Generated apple icon');

  // Generate og-image.png
  await sharp(svgBuffer)
    .resize(1200, 630)
    .png()
    .toFile(path.join(__dirname, '../public/og-image.png'));
  
  console.log('Generated OG image');

  // Copy 32x32 as favicon.png
  await fs.copyFile(
    path.join(__dirname, '../public/icon-32.png'),
    path.join(__dirname, '../public/favicon.png')
  );
  
  console.log('All icons generated successfully!');
}

generateIcons().catch(console.error); 