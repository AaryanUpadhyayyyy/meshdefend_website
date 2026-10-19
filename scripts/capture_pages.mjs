import puppeteer from 'puppeteer-core';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,1200'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1200 });

  await page.goto('http://localhost:3000/company/about', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  // Scroll to vision section
  await page.evaluate(() => {
    const el = document.querySelector('.about-vision-section');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: 'C:/Users/AARYAN UPADHYAY/.gemini/antigravity/brain/6604facc-2db4-47fb-80bc-64fa6136806c/about_vision_section_dark.png',
    clip: { x: 0, y: 0, width: 1440, height: 1000 }
  });

  // Scroll to leadership section
  await page.evaluate(() => {
    const el = document.querySelector('.about-leadership-section');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: 'C:/Users/AARYAN UPADHYAY/.gemini/antigravity/brain/6604facc-2db4-47fb-80bc-64fa6136806c/about_founders_section_dark.png',
    clip: { x: 0, y: 0, width: 1440, height: 800 }
  });

  // Switch to light mode and capture vision
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.setAttribute('data-theme', 'light');
    const el = document.querySelector('.about-vision-section');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({
    path: 'C:/Users/AARYAN UPADHYAY/.gemini/antigravity/brain/6604facc-2db4-47fb-80bc-64fa6136806c/about_vision_section_light.png',
    clip: { x: 0, y: 0, width: 1440, height: 1000 }
  });

  console.log('Saved vision & founders screenshots!');
  await browser.close();
}

run().catch(console.error);
