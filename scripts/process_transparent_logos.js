const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processLogos() {
  const dir = path.join(__dirname, '..', 'public', 'images', 'logos');
  const files = ['microsoft', 'aws', 'openai', 'anthropic', 'dell', 'nvidia', 'azure', 'kalaari'];

  for (const name of files) {
    const filePath = path.join(dir, `${name}.png`);
    if (!fs.existsSync(filePath)) continue;

    const image = sharp(filePath);
    const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });

    // 1. Create transparent version
    // Convert near-white pixels (r>240 && g>240 && b>240) to alpha=0 with soft alpha blending for anti-aliasing
    const transparentData = Buffer.alloc(info.width * info.height * 4);

    for (let i = 0; i < info.width * info.height; i++) {
      const r = info.channels === 4 ? data[i * 4] : data[i * 3];
      const g = info.channels === 4 ? data[i * 4 + 1] : data[i * 3 + 1];
      const b = info.channels === 4 ? data[i * 4 + 2] : data[i * 3 + 2];
      
      const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
      
      transparentData[i * 4] = r;
      transparentData[i * 4 + 1] = g;
      transparentData[i * 4 + 2] = b;

      if (brightness > 248) {
        transparentData[i * 4 + 3] = 0; // Fully transparent
      } else if (brightness > 220) {
        // Soft edge antialiasing
        const alpha = Math.round(((248 - brightness) / 28) * 255);
        transparentData[i * 4 + 3] = alpha;
      } else {
        transparentData[i * 4 + 3] = 255;
      }
    }

    await sharp(transparentData, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    })
    .trim()
    .toFile(path.join(dir, `${name}-transparent.png`));
    console.log(`Created ${name}-transparent.png`);

    // 2. For Kalaari, also create a special dark-mode version (kalaari-white.png)
    // where text is white and the blue star is preserved
    if (name === 'kalaari') {
      const darkData = Buffer.alloc(info.width * info.height * 4);
      for (let i = 0; i < info.width * info.height; i++) {
        const r = transparentData[i * 4];
        const g = transparentData[i * 4 + 1];
        const b = transparentData[i * 4 + 2];
        const a = transparentData[i * 4 + 3];

        if (a === 0) {
          darkData[i * 4] = 0;
          darkData[i * 4 + 1] = 0;
          darkData[i * 4 + 2] = 0;
          darkData[i * 4 + 3] = 0;
        } else {
          // Check if pixel is blue (star) or dark (text)
          // The star is predominantly blue: b > 140 && b > r + 30
          const isBlueStar = b > 130 && (b - r > 40 || b - g > 40);
          if (isBlueStar) {
            darkData[i * 4] = 30;
            darkData[i * 4 + 1] = 110;
            darkData[i * 4 + 2] = 255; // Vibrant bright electric blue
            darkData[i * 4 + 3] = a;
          } else {
            // Text turns white
            darkData[i * 4] = 255;
            darkData[i * 4 + 1] = 255;
            darkData[i * 4 + 2] = 255;
            darkData[i * 4 + 3] = a;
          }
        }
      }

      await sharp(darkData, {
        raw: {
          width: info.width,
          height: info.height,
          channels: 4
        }
      })
      .trim()
      .toFile(path.join(dir, `kalaari-white.png`));
      console.log(`Created kalaari-white.png`);
    }
  }
}

processLogos().catch(console.error);
