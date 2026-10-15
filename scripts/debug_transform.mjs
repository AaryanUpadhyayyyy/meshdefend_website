import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  const data = await page.evaluate(() => {
    const stage = document.querySelector('.hero-reveal-stage');
    const hero = document.getElementById('hero');
    const consoleContainer = stage?.querySelector('[role="region"]')?.parentElement;
    return {
      windowScrollY: window.scrollY,
      heroHeight: hero?.offsetHeight,
      stageHeight: stage?.offsetHeight,
      cssVariableP: stage?.style.getPropertyValue('--p'),
      inlineTransform: consoleContainer?.style.transform,
      computedTransform: consoleContainer ? window.getComputedStyle(consoleContainer).transform : null,
      top: consoleContainer?.style.top,
      rect: consoleContainer?.getBoundingClientRect()
    };
  });

  console.log('Page debug data at p=0:', JSON.stringify(data, null, 2));
  await browser.close();
}

main();
