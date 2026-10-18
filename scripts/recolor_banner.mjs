import sharp from 'sharp';
import path from 'path';

async function recolorBlueToOrange() {
  const inputPath = 'public/newsroom/bigpanda-unleashing-agentic-it-operations-rc-628.png';
  const outputPath = 'public/newsroom/meshdefend-agentic-operations-orange.png';

  const image = sharp(inputPath);
  const metadata = await image.metadata();
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

  const channels = info.channels;
  // Orange target: #f45532 -> rgb(244, 85, 50)
  // Dark orange: #c5401f -> rgb(197, 64, 31)

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Detect blue pixels: b is significantly higher than r and g
    // Or specifically the pure electric blue (#0041f5, #0034c2, etc.)
    if (b > 120 && b > r * 1.3 && b > g * 1.1) {
      // Calculate intensity of the blue
      const intensity = b / 255;
      // Map to orange
      // Pure blue -> rgb(244, 85, 50)
      // Light blue (#c7daff) -> rgb(254, 210, 200)
      const isLightBlue = r > 150 && g > 180;
      if (isLightBlue) {
        data[i] = 254; // r
        data[i + 1] = Math.round(180 + (255 - b) * 0.5); // g
        data[i + 2] = 160; // b
      } else {
        data[i] = Math.min(255, Math.round(244 * intensity)); // r
        data[i + 1] = Math.round(75 * intensity + g * 0.2); // g
        data[i + 2] = Math.round(35 * intensity); // b
      }
    }
  }

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels,
    },
  })
    .png()
    .toFile(outputPath);

  console.log('Recolored image saved to:', outputPath);
}

recolorBlueToOrange().catch(console.error);
