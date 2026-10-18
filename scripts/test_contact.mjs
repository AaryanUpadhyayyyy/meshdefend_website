import puppeteer from 'puppeteer-core';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  // Mobile Light Mode (iPhone 16: 393 x 852) - Full Page
  await page.setViewport({ width: 393, height: 852, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000/company/contact', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    localStorage.setItem('theme', 'light');
    document.documentElement.classList.remove('dark');
    document.documentElement.setAttribute('data-theme', 'light');
  });
  await page.reload({ waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.setAttribute('data-theme', 'light');
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'C:/Users/AARYAN UPADHYAY/.gemini/antigravity/brain/6604facc-2db4-47fb-80bc-64fa6136806c/contact_mobile_full_light.png', fullPage: true });

  // Mobile Dark Mode (iPhone 16: 393 x 852) - Full Page
  await page.evaluate(() => {
    localStorage.setItem('theme', 'dark');
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-theme', 'dark');
  });
  await page.reload({ waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.setAttribute('data-theme', 'dark');
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'C:/Users/AARYAN UPADHYAY/.gemini/antigravity/brain/6604facc-2db4-47fb-80bc-64fa6136806c/contact_mobile_full_dark.png', fullPage: true });

  console.log('Mobile full-page screenshots captured successfully!');
  await browser.close();
}

run().catch(console.error);
