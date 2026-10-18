import puppeteer from 'puppeteer-core';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:3005/company/newsroom', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise((r) => setTimeout(r, 1500));

  // Force light mode
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  });
  await new Promise((r) => setTimeout(r, 600));

  const hero = await page.$('.bp-hero-section');
  if (hero) await hero.screenshot({ path: '../our_hero_light.png' });

  const press = await page.$('.bp-section-press');
  if (press) await press.screenshot({ path: '../our_press_light.png' });

  const news = await page.$('.bp-section-in-the-news');
  if (news) await news.screenshot({ path: '../our_in_the_news_light.png' });

  const awards = await page.$('.bp-section-awards');
  if (awards) await awards.screenshot({ path: '../our_awards_light.png' });

  const banner = await page.$('.bp-section-banner');
  if (banner) await banner.screenshot({ path: '../our_banner_light.png' });

  await page.screenshot({ path: '../our_full_light.png', fullPage: true });

  console.log('Saved all light screenshots!');
  await browser.close();
}

run().catch(console.error);
