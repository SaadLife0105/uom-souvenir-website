const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));

  // 1. Open the pen product page from shop, add 1 to cart
  await page.goto('http://localhost:3000/shop', { waitUntil: 'networkidle' });
  await page.click('a:has-text("UOM Souvenir Pen")');
  await page.waitForSelector('text=Back to Shop');
  await page.locator('button:has-text("Add to Cart")').first().click();
  await page.waitForTimeout(400);

  // 2. Go to cart, confirm 1 pen line
  await page.goto('http://localhost:3000/cart', { waitUntil: 'networkidle' });
  await page.waitForSelector('text=Cart Items');
  console.log('Cart header:', (await page.locator('h2:has-text("Cart Items")').innerText()).trim());

  // 3. Click Generate Receipt (leave payment ref blank) and wait for redirect
  await page.click('button:has-text("Generate Receipt")');
  // success redirects to /shop/receipt/<id> (404 page until next task) — capture the id
  await page.waitForURL(/\/shop\/receipt\/.+/, { timeout: 15000 });
  const url = page.url();
  const reservationId = url.split('/shop/receipt/')[1];
  console.log('REDIRECT_URL:', url);
  console.log('RESERVATION_ID:', reservationId);

  console.log('ERRORS:', JSON.stringify(errors));
  await browser.close();
})();
