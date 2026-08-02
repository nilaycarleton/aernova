import { expect, test, type Locator } from '@playwright/test';
import sharp from 'sharp';

async function expectCanvasHasVisiblePixels(canvas: Locator, label: string) {
  await expect
    .poll(
      async () => {
        const image = await canvas.screenshot();
        const { data, info } = await sharp(image)
          .ensureAlpha()
          .raw()
          .toBuffer({ resolveWithObject: true });

        let brightPixels = 0;
        const stride = 4 * 12;

        for (let index = 0; index < data.length; index += stride) {
          const red = data[index];
          const green = data[index + 1];
          const blue = data[index + 2];
          const alpha = data[index + 3];

          if (alpha > 32 && red + green + blue > 95) {
            brightPixels += 1;
          }
        }

        return brightPixels / Math.max(1, (info.width * info.height) / 12);
      },
      {
        message: `${label} should render nonblank screenshot pixels`,
        timeout: 20_000,
      }
    )
    .toBeGreaterThan(0.002);
}

test('desktop landing page renders clean industrial layout and captures screenshot', async ({
  page,
  isMobile,
}, testInfo) => {
  test.skip(isMobile, 'Desktop screenshot coverage runs only in the desktop project.');

  await page.goto('/');

  await expect(page).toHaveTitle(/Aernova Inc\./);
  await expect(page.getByRole('heading', { name: /precision drone mapping/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /request a quote/i }).first()).toBeVisible();

  for (const name of ['Technical Capabilities', 'Project Portfolio', 'Clean Data', 'Request A Quote']) {
    await expect(page.getByRole('heading', { name: new RegExp(name, 'i') })).toBeVisible();
  }

  await expect(page.getByRole('contentinfo')).toContainText('Aernova Inc.');
  await expect(page.getByRole('contentinfo')).toContainText('Greater Toronto Area & Ottawa, ON');
  await expect(page.getByRole('link', { name: /privacy policy/i })).toHaveAttribute(
    'href',
    '/privacy'
  );

  await page.screenshot({
    path: testInfo.outputPath('aernova-desktop-full.png'),
    fullPage: true,
  });
});

test('project preview and modal canvases render nonblank pixels', async ({
  page,
  isMobile,
}, testInfo) => {
  test.skip(isMobile, 'Canvas pixel verification runs against the desktop project.');

  await page.goto('/');
  await page.locator('#projects').scrollIntoViewIfNeeded();

  const previewCanvas = page.locator('#projects canvas').first();
  await expect(previewCanvas).toBeVisible({ timeout: 20_000 });
  await expect(page.getByText(/Loading Model/i)).toHaveCount(0, { timeout: 30_000 });
  await expectCanvasHasVisiblePixels(previewCanvas, 'project preview canvas');

  await page.getByRole('button', { name: /open 3d viewer/i }).first().click();

  const modalCanvas = page.locator('.fixed.inset-0 canvas').first();
  await expect(modalCanvas).toBeVisible({ timeout: 20_000 });
  await expect(page.getByText(/drag to rotate/i)).toBeVisible();
  await expect(page.getByText(/Loading Model/i)).toHaveCount(0, { timeout: 30_000 });
  await expectCanvasHasVisiblePixels(modalCanvas, 'project modal canvas');

  await page.screenshot({
    path: testInfo.outputPath('aernova-project-modal.png'),
    fullPage: true,
  });
});

test('mobile viewport keeps navigation, CTA, and footer usable', async ({
  page,
  isMobile,
}, testInfo) => {
  test.skip(!isMobile, 'Mobile navigation coverage runs only in the mobile project.');

  await page.goto('/');

  await expect(page.getByRole('heading', { name: /precision drone mapping/i })).toBeVisible();
  await page.getByRole('button', { name: /toggle menu/i }).click();
  const mobileMenu = page.locator('.fixed.inset-0.z-40');
  await expect(mobileMenu.getByRole('link', { name: /^services$/i })).toBeVisible();
  await mobileMenu.getByRole('link', { name: /^contact$/i }).click();

  await expect(page.getByRole('heading', { name: /request a quote/i })).toBeVisible();
  await page.locator('footer').scrollIntoViewIfNeeded();
  await expect(page.getByRole('contentinfo')).toContainText('Aernova Inc.');

  await page.screenshot({
    path: testInfo.outputPath('aernova-mobile-full.png'),
    fullPage: true,
  });
});
