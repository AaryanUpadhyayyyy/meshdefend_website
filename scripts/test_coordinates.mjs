import puppeteer from 'puppeteer-core';

async function test() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  const page = await browser.newPage();
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Scroll to p = 0.6
  await page.evaluate(() => {
    const hero = document.getElementById('hero');
    const scrollDistance = hero.offsetHeight - window.innerHeight;
    window.scrollTo(0, 0.60 * scrollDistance);
  });

  await new Promise(r => setTimeout(r, 2800));

  const info = await page.evaluate(() => {
    const stage = document.querySelector('.hero-reveal-stage');
    const stageRect = stage?.getBoundingClientRect();
    const hub = document.querySelector('.world > div:nth-child(2)');
    const hubRect = hub?.getBoundingClientRect();
    const marker = document.getElementById('timeline-failure-marker');
    const markerRect = marker?.getBoundingClientRect();
    const threadSvg = document.querySelector('.hero-reveal-stage > svg path');

    return {
      stageRect: stageRect ? { left: stageRect.left, top: stageRect.top, width: stageRect.width, height: stageRect.height } : null,
      hubRect: hubRect ? { left: hubRect.left, top: hubRect.top, width: hubRect.width, height: hubRect.height } : null,
      markerRect: markerRect ? { left: markerRect.left, top: markerRect.top, width: markerRect.width, height: markerRect.height } : null,
      threadPathD: threadSvg?.getAttribute('d'),
      threadStroke: threadSvg?.getAttribute('stroke'),
      threadOpacity: threadSvg ? window.getComputedStyle(threadSvg).opacity : null
    };
  });

  console.log('Coordinates at p=0.60:', JSON.stringify(info, null, 2));
  await browser.close();
}

test();
