import puppeteer from 'puppeteer-core';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,1200'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1200 });

  await page.goto('http://localhost:3000/company/investors-partners', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  await page.screenshot({
    path: 'C:/Users/AARYAN UPADHYAY/.gemini/antigravity/brain/6604facc-2db4-47fb-80bc-64fa6136806c/investors_updated_dark.png',
    fullPage: false,
    clip: { x: 0, y: 0, width: 1440, height: 1200 }
  });

  // Switch to light mode
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.setAttribute('data-theme', 'light');
  });
  await new Promise(r => setTimeout(r, 400));

  await page.screenshot({
    path: 'C:/Users/AARYAN UPADHYAY/.gemini/antigravity/brain/6604facc-2db4-47fb-80bc-64fa6136806c/investors_updated_light.png',
    fullPage: false,
    clip: { x: 0, y: 0, width: 1440, height: 1200 }
  });

  console.log('Saved investors updated screenshots!');
  await browser.close();
}

run().catch(console.error);
