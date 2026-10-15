import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.resolve('public/screenshots/hero_verify');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function run() {
  console.log('Launching browser for Hero verification...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);

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

  try {
    // 1. Desktop 1440x900 Tests (Dark & Light)
    console.log('Testing 1440x900...');
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts?.ready);

    for (const theme of ['dark', 'light']) {
      await setTheme(theme);

      // Frame 1: Rest (idle)
      await new Promise((r) => setTimeout(r, 500));
      await page.screenshot({ path: path.join(OUTPUT_DIR, `1440_${theme}_rest.png`) });
      console.log(`Saved 1440_${theme}_rest.png`);

      // Frame 2: Repairing (wait for 3.6s mark: repairing catenary mid-draw with bead)
      await new Promise((r) => setTimeout(r, 3200));
      await page.screenshot({ path: path.join(OUTPUT_DIR, `1440_${theme}_repairing.png`) });
      console.log(`Saved 1440_${theme}_repairing.png`);

      // Frame 3: Restored (wait for 5.2s mark: warm-light sprites lit over dark windows)
      await new Promise((r) => setTimeout(r, 1600));
      await page.screenshot({ path: path.join(OUTPUT_DIR, `1440_${theme}_restored.png`) });
      console.log(`Saved 1440_${theme}_restored.png`);
    }

    // 2. Hotspots Tests on 1440x900 Dark (Test each of the 4 hotspots)
    console.log('Testing Hotspot tooltips...');
    await setTheme('dark');
    const hotspotIds = ['datacenter', 'hospital', 'port', 'blackout'];
    for (const id of hotspotIds) {
      await page.evaluate((btnId) => {
        const btn = document.querySelector(`button[aria-describedby="hotspot-chip-${btnId}"]`);
        if (btn) btn.click();
      }, id);
      await new Promise((r) => setTimeout(r, 300));
      await page.screenshot({ path: path.join(OUTPUT_DIR, `1440_dark_hotspot_${id}.png`) });
      console.log(`Saved 1440_dark_hotspot_${id}.png`);
    }

    // 3. Desktop 1366x768 Tests
    console.log('Testing 1366x768...');
    await page.setViewport({ width: 1366, height: 768, deviceScaleFactor: 1 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await setTheme('dark');
    await new Promise((r) => setTimeout(r, 500));
    await page.screenshot({ path: path.join(OUTPUT_DIR, `1366_dark_rest.png`) });

    // 4. Desktop 1920x1080 Tests
    console.log('Testing 1920x1080...');
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await setTheme('dark');
    await new Promise((r) => setTimeout(r, 500));
    await page.screenshot({ path: path.join(OUTPUT_DIR, `1920_dark_rest.png`) });

    // 5. Transition into "The console" section
    console.log('Testing transition into "The console"...');
    await page.evaluate(() => {
      const consoleSec = document.getElementById('console');
      if (consoleSec) consoleSec.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(OUTPUT_DIR, `transition_to_console.png`) });

    // 6. Mobile 390x844 Tests
    console.log('Testing 390x844...');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    await setTheme('dark');
    await new Promise((r) => setTimeout(r, 500));
    await page.screenshot({ path: path.join(OUTPUT_DIR, `390_dark_top.png`) });

    console.log('All verification captures completed successfully!');
  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    await browser.close();
  }
}

run();
