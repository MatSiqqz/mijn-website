import assert from 'node:assert/strict';
import { chromium, expect } from '@playwright/test';

// Start the development or preview server first. Tests use an isolated browser
// context and never change a visitor's stored portfolio drafts.
const baseUrl = (process.env.BASE_URL || 'http://127.0.0.1:5173').replace(/\/$/, '');
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium',
  headless: true,
  args: ['--no-sandbox'],
});
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
const page = await context.newPage();
const pageErrors = [];
page.on('pageerror', error => pageErrors.push(error.message));
let passed = 0;
const failures = [];

async function check(name, callback) {
  try {
    await callback();
    passed += 1;
    console.log(`PASS ${name}`);
  } catch (error) {
    failures.push({ name, message: error.message });
    console.error(`FAIL ${name}: ${error.message}`);
  }
}

async function route(path, title) {
  await page.goto(`${baseUrl}/#${path}`);
  await expect(page.locator('main h1')).toHaveCount(1);
  await expect(page.locator('main h1')).toContainText(title);
  await expect(page.locator('main')).toBeVisible();
}

const routes = [
  ['/', 'Een eigen koers.'],
  ['/over-mij', 'Ik ben Mats.'],
  ['/cv', 'Een begin met'],
  ['/talentontwikkeling', 'Ontdekken wat ik kan.'],
  ['/snuffelstage', 'Van de collegezaal'],
  ['/meer', 'Ook buiten de les'],
  ['/colofon', 'Over dit portfolio.'],
];
const assignments = [
  ['personal-branding', 'Personal branding'],
  ['ondernemend', 'Hoe ondernemend ben jij?'],
  ['leerdoelen', 'Leerdoelen & goede voornemens'],
  ['toekomstbrief', 'Schrijf een brief uit de nabije toekomst aan jezelf'],
  ['tow-gesprekken', 'TOW-gesprekken met je TOW-docent'],
  ['events', 'Deelname aan minimaal 2 events'],
  ['ondernemersreis', 'Terugblik op mijn ondernemersreis'],
];

try {
  for (const [path, title] of routes) {
    await check(`desktop route ${path}`, () => route(path, title));
  }
  for (const [id, title] of assignments) {
    await check(`assignment ${id}`, async () => {
      await route(`/talentontwikkeling/${id}`, title);
      await expect(page.locator('.check-list li')).not.toHaveCount(0);
      await expect(page.locator('.deadline-panel')).toBeVisible();
    });
  }
  await check('home portfolio filters show the correct cards', async () => {
    await route('/', 'Een eigen koers.');
    await expect(page.locator('.project-card')).toHaveCount(3);
    const filters = page.getByRole('group', { name: 'Filter portfolio', exact: true });
    await filters.getByRole('button', { name: 'Praktijk', exact: true }).click();
    await expect(page.locator('.project-card')).toHaveCount(1);
    await expect(page.locator('.project-card')).toContainText('Een kijkje achter de schermen.');
    await filters.getByRole('button', { name: 'Talentontwikkeling', exact: true }).click();
    await expect(page.locator('.project-card')).toHaveCount(2);
    await filters.getByRole('button', { name: /Alles/ }).click();
    await expect(page.locator('.project-card')).toHaveCount(3);
  });
  await check('assignment period filters, search and empty-state reset', async () => {
    await route('/talentontwikkeling', 'Ontdekken wat ik kan.');
    await expect(page.locator('.assignment-row')).toHaveCount(7);
    const filters = page.getByRole('group', { name: 'Filter opdrachten op periode' });
    await filters.getByRole('button', { name: 'Periode 1', exact: true }).click();
    await expect(page.locator('.assignment-row')).toHaveCount(3);
    await filters.getByRole('button', { name: 'Periode 2', exact: true }).click();
    await expect(page.locator('.assignment-row')).toHaveCount(1);
    await expect(page.locator('.assignment-row')).toContainText('Schrijf een brief');
    await filters.getByRole('button', { name: 'Doorlopend', exact: true }).click();
    await expect(page.locator('.assignment-row')).toHaveCount(2);
    await filters.getByRole('button', { name: 'Alle opdrachten', exact: true }).click();
    await page.getByRole('searchbox', { name: 'Zoek een opdracht' }).fill('leerdoelen');
    assert((await page.locator('.assignment-row').count()) > 0);
    await page.getByRole('searchbox', { name: 'Zoek een opdracht' }).fill('nietsmetdezeterm');
    await expect(page.locator('.assignment-row')).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Geen opdrachten gevonden.' })).toBeVisible();
    await page.getByRole('button', { name: 'Filters wissen' }).click();
    await expect(page.locator('.assignment-row')).toHaveCount(7);
    await expect(page.getByRole('searchbox')).toHaveValue('');
  });
  await check('draft save survives reload and markdown download contains the draft', async () => {
    await route('/talentontwikkeling/ondernemend', 'Hoe ondernemend ben jij?');
    await page.getByRole('button', { name: /Mijn conceptwerkruimte/ }).click();
    const draft = 'Dit is een geïsoleerde testuitwerking, geen persoonlijk resultaat van Mats.';
    const textarea = page.getByRole('textbox', { name: /Mijn eigen uitwerking/ });
    await textarea.fill(draft);
    await page.getByRole('button', { name: 'Bewaar op dit apparaat' }).click();
    await expect(page.getByRole('status')).toContainText('Opgeslagen in deze browser');
    await page.reload();
    await page.getByRole('button', { name: /Mijn conceptwerkruimte/ }).click();
    await expect(textarea).toHaveValue(draft);
    const downloading = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download concept' }).click();
    const download = await downloading;
    assert.equal(download.suggestedFilename(), 'concept-ondernemend.md');
    const chunks = [];
    for await (const chunk of await download.createReadStream()) chunks.push(chunk);
    const markdown = Buffer.concat(chunks).toString('utf8');
    assert(markdown.includes(draft));
    assert(markdown.startsWith('# Hoe ondernemend ben jij?'));
    await page.evaluate(() => localStorage.removeItem('mats-portfolio-draft-v1:ondernemend'));
  });
  await check('CV download returns a real PDF', async () => {
    await route('/cv', 'Een begin met');
    const href = await page.getByRole('link', { name: 'Download mijn CV' }).getAttribute('href');
    const response = await context.request.get(new URL(href, `${baseUrl}/`).toString());
    assert.equal(response.status(), 200);
    assert.match(response.headers()['content-type'], /application\/pdf/);
    assert.equal((await response.body()).subarray(0, 5).toString(), '%PDF-');
    const downloading = page.waitForEvent('download');
    await page.getByRole('link', { name: 'Download mijn CV' }).click();
    assert.equal((await downloading).suggestedFilename(), 'CV-Mats-de-Roon.pdf');
  });
  await check('stage and extra-content accordions open', async () => {
    await route('/snuffelstage', 'Van de collegezaal');
    const stageDetails = page.locator('details').filter({ has: page.locator('summary', { hasText: 'Mijn stageopdrachten' }) });
    await stageDetails.locator('summary').click();
    await expect(stageDetails).toHaveAttribute('open', '');
    await expect(stageDetails.locator('.accordion-content')).toBeVisible();
    await route('/meer', 'Ook buiten de les');
    const detail = page.locator('details').first();
    await detail.locator('summary').click();
    await expect(detail).toHaveAttribute('open', '');
    await expect(detail.locator('ul')).toBeVisible();
  });
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    await check(`mobile ${width}px menu navigation and close`, async () => {
      await route('/', 'Een eigen koers.');
      const toggle = page.getByRole('button', { name: 'Menu openen' });
      await expect(toggle).toBeVisible();
      await toggle.click();
      await expect(page.getByRole('button', { name: 'Menu sluiten' })).toHaveAttribute('aria-expanded', 'true');
      await page.getByRole('navigation', { name: 'Mobiele navigatie' }).getByRole('link', { name: 'Over mij' }).click();
      await expect(page.locator('h1')).toContainText('Ik ben Mats.');
      await expect(page.getByRole('navigation', { name: 'Mobiele navigatie' })).toHaveCount(0);
    });
    for (const [path, title] of [...routes, ['/talentontwikkeling/toekomstbrief', 'Schrijf een brief']]) {
      await check(`mobile ${width}px no overflow ${path}`, async () => {
        await route(path, title);
        await page.evaluate(() => document.fonts.ready);
        const dimensions = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
        assert(dimensions.scroll <= dimensions.client + 1, `horizontal overflow: ${dimensions.scroll}px > ${dimensions.client}px`);
      });
    }
    await check(`mobile ${width}px opened draft editor fits the viewport`, async () => {
      await route('/talentontwikkeling/personal-branding', 'Personal branding');
      await page.getByRole('button', { name: /Mijn conceptwerkruimte/ }).click();
      await expect(page.getByRole('textbox', { name: /Mijn eigen uitwerking/ })).toBeVisible();
      const dimensions = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
      assert(dimensions.scroll <= dimensions.client + 1, `opened editor overflow: ${dimensions.scroll}px > ${dimensions.client}px`);
    });
  }
  await check('no browser page errors', async () => assert.deepEqual(pageErrors, []));
} finally {
  await browser.close();
}

console.log(`\n${passed} checks passed; ${failures.length} failed.`);
if (failures.length) process.exitCode = 1;
