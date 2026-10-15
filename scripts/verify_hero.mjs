import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.resolve('public/screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function run() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1920,1080'],
  });

  const page = await browser.newPage();

  // Helper to set theme
  async function setTheme(theme) {
    await page.evaluate((t) => {
      const html = document.documentElement;
      if (t === 'dark') {
        html.classList.add('dark');
        html.setAttribute('data-theme', 'dark');
      } else {
        html.classList.remove('dark');
        html.setAttribute('data-theme', 'light');
      }
    }, theme);
    await new Promise((r) => setTimeout(r, 200));
  }

  // Helper to scroll to p (0 to 1)
  async function scrollToP(p) {
    await page.evaluate((targetP) => {
      const hero = document.getElementById('hero');
      if (!hero) return;
      const scrollDistance = hero.offsetHeight - window.innerHeight;
      window.scrollTo(0, targetP * scrollDistance);
    }, p);
    await new Promise((r) => setTimeout(r, 400));
  }

  try {
    // 1. Desktop 1440x900 Tests
    console.log('Testing 1440x900...');
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts?.ready);

    for (const theme of ['dark', 'light']) {
      await setTheme(theme);
      
      // p = 0
      await scrollToP(0);
      await page.screenshot({ path: path.join(OUTPUT_DIR, `hero_1440_${theme}_p0.png`) });
      console.log(`Saved hero_1440_${theme}_p0.png`);

      // p = 0.20
      await scrollToP(0.20);
      await page.screenshot({ path: path.join(OUTPUT_DIR, `hero_1440_${theme}_p20.png`) });
      console.log(`Saved hero_1440_${theme}_p20.png`);

      // p = 0.35
      await scrollToP(0.35);
      await page.screenshot({ path: path.join(OUTPUT_DIR, `hero_1440_${theme}_p35.png`) });
      console.log(`Saved hero_1440_${theme}_p35.png`);

      // p = 0.50
      await scrollToP(0.50);
      await page.screenshot({ path: path.join(OUTPUT_DIR, `hero_1440_${theme}_p50.png`) });
      console.log(`Saved hero_1440_${theme}_p50.png`);

      // p = 0.60 (Trigger fires!)
      await scrollToP(0.60);
      // Wait +2.5s after trigger to let failure row & 02:44 & 02:52 slide in
      await new Promise((r) => setTimeout(r, 2600));
      await page.screenshot({ path: path.join(OUTPUT_DIR, `hero_1440_${theme}_triggered_p60.png`) });
      console.log(`Saved hero_1440_${theme}_triggered_p60.png`);

      // Click "Approve fix" button
      const approved = await page.evaluate(() => {
        const btn = Array.from(document.querySelectorAll('button')).find(
          (b) => b.textContent?.includes('Approve fix')
        );
        if (btn) {
          btn.click();
          return true;
        }
        return false;
      });

      if (approved) {
        // Wait 1.3s for warm-light sprites fade in and console check update
        await new Promise((r) => setTimeout(r, 1400));
        await page.screenshot({ path: path.join(OUTPUT_DIR, `hero_1440_${theme}_approved_verified.png`) });
        console.log(`Saved hero_1440_${theme}_approved_verified.png`);
      }
    }

    // 2. Desktop 1920x1080 Tests
    console.log('Testing 1920x1080...');
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await setTheme('dark');
    await scrollToP(0);
    await page.screenshot({ path: path.join(OUTPUT_DIR, `hero_1920_dark_p0.png`) });
    await scrollToP(0.60);
    await new Promise((r) => setTimeout(r, 2600));
    await page.screenshot({ path: path.join(OUTPUT_DIR, `hero_1920_dark_p60.png`) });

    // 3. Mobile 390px Tests
    console.log('Testing 390x844...');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await setTheme('dark');
    await page.screenshot({ path: path.join(OUTPUT_DIR, `hero_390_dark_top.png`) });

    // Scroll to console on mobile
    await page.evaluate(() => {
      window.scrollTo(0, 500);
    });
    await new Promise((r) => setTimeout(r, 2600));
    await page.screenshot({ path: path.join(OUTPUT_DIR, `hero_390_dark_console.png`) });

    console.log('All verification captures completed successfully!');
  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    await browser.close();
  }
}

run();
