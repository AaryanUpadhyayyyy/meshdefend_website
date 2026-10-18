import puppeteer from 'puppeteer-core';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  const samplePath = 'file:///C:/Users/AARYAN%20UPADHYAY/Downloads/MeshDefend/newsroom%20sample.html';
  await page.goto(samplePath, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // Screenshot hero
  const heroEl = await page.$('.et_pb_section_0');
  if (heroEl) await heroEl.screenshot({ path: '../sample_hero.png' });

  // Screenshot press releases section
  const pressEl = await page.$('.et_pb_section_1');
  if (pressEl) await pressEl.screenshot({ path: '../sample_press.png' });

  // Screenshot in the news section
  const newsEl = await page.$('.et_pb_section_2');
  if (newsEl) await newsEl.screenshot({ path: '../sample_in_the_news.png' });

  // Screenshot awards section
  const awardsEl = await page.$('.et_pb_section_3');
  if (awardsEl) await awardsEl.screenshot({ path: '../sample_awards.png' });

  // Screenshot banner section
  const bannerEl = await page.$('.et_pb_section_5');
  if (bannerEl) await bannerEl.screenshot({ path: '../sample_banner.png' });

  console.log('Saved all sample screenshots successfully!');
  await browser.close();
}

run().catch(console.error);
