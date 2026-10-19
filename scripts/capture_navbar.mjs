import puppeteer from 'puppeteer-core';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000/company/about', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // Toggle theme to light by clicking theme toggle
  const themeToggle = await page.$('.theme-toggle');
  if (themeToggle) {
    await themeToggle.click();
    await new Promise(r => setTimeout(r, 500));
  }

  // Click Platform
  const buttons = await page.$$('.nav-item-btn');
  if (buttons.length > 0) {
    await buttons[0].click();
  }
  await new Promise(r => setTimeout(r, 500));

  await page.screenshot({
    path: 'C:/Users/AARYAN UPADHYAY/.gemini/antigravity/brain/6604facc-2db4-47fb-80bc-64fa6136806c/navbar_platform_pure_light.png',
    clip: { x: 0, y: 0, width: 1440, height: 600 }
  });

  // Click Solutions
  if (buttons.length > 1) {
    await buttons[1].click();
  }
  await new Promise(r => setTimeout(r, 500));

  await page.screenshot({
    path: 'C:/Users/AARYAN UPADHYAY/.gemini/antigravity/brain/6604facc-2db4-47fb-80bc-64fa6136806c/navbar_solutions_pure_light.png',
    clip: { x: 0, y: 0, width: 1440, height: 600 }
  });

  console.log('Saved pure light mode screenshots!');
  await browser.close();
}

run().catch(console.error);
