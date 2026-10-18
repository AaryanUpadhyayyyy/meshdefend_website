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

  // 1. Mobile Dark Mode - Top of Home Page
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'C:/Users/AARYAN UPADHYAY/.gemini/antigravity/brain/6604facc-2db4-47fb-80bc-64fa6136806c/home_mobile_fixed_dark.png' });

  // 2. Mobile Light Mode - Reload with light theme in localStorage so next-themes initializes light
  await page.evaluate(() => {
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
    document.documentElement.setAttribute('data-theme', 'light');
  });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.setAttribute('data-theme', 'light');
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'C:/Users/AARYAN UPADHYAY/.gemini/antigravity/brain/6604facc-2db4-47fb-80bc-64fa6136806c/home_mobile_fixed_light.png' });

  // 3. Scroll down slightly in dark mode to verify transition into TrustSection without empty space
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    window.scrollBy(0, 300);
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'C:/Users/AARYAN UPADHYAY/.gemini/antigravity/brain/6604facc-2db4-47fb-80bc-64fa6136806c/home_mobile_scroll_transition.png' });

  console.log('Mobile screenshots captured successfully!');
  await browser.close();
}

run().catch(console.error);
