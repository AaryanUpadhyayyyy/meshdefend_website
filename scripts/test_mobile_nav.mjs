import puppeteer from 'puppeteer-core';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  // Test iPhone 16 viewport
  await page.setViewport({ width: 393, height: 852, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000/company/careers', { waitUntil: 'networkidle0' });

  // 1. Mobile Dark Mode - closed
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'C:/Users/AARYAN UPADHYAY/.gemini/antigravity/brain/6604facc-2db4-47fb-80bc-64fa6136806c/mobile_nav_dark.png' });

  // 2. Mobile Light Mode - closed
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'C:/Users/AARYAN UPADHYAY/.gemini/antigravity/brain/6604facc-2db4-47fb-80bc-64fa6136806c/mobile_nav_light.png' });

  // 3. Mobile Dark Mode - menu open
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  });
  await page.click('.mobile-toggle');
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'C:/Users/AARYAN UPADHYAY/.gemini/antigravity/brain/6604facc-2db4-47fb-80bc-64fa6136806c/mobile_nav_open.png' });

  // 4. Desktop 1440x900 verification
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/company/careers', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'C:/Users/AARYAN UPADHYAY/.gemini/antigravity/brain/6604facc-2db4-47fb-80bc-64fa6136806c/desktop_nav_dark.png' });

  console.log('All verification screenshots captured!');
  await browser.close();
}

run().catch(console.error);
