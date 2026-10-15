import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  const colors = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    const img = document.querySelector('.world img');
    canvas.width = img.naturalWidth;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const samples = [];
    for (let x = 0; x < canvas.width; x += 150) {
      const d = ctx.getImageData(x, 2, 1, 1).data;
      samples.push({
        x,
        r: d[0],
        g: d[1],
        b: d[2],
        hex: '#' + [d[0], d[1], d[2]].map((v) => v.toString(16).padStart(2, '0')).join(''),
      });
    }
    return samples;
  });

  console.log('Top row colors:', colors);
  await browser.close();
}

main();
