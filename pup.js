const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://google.com', {
    waitUntil: 'networkidle2',
  });
  await page.pdf({path: 'hn.pdf', format: 'a4'});
})();