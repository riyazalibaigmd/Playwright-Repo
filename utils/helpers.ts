import type { Page, TestInfo } from '@playwright/test';

export async function attachFinalState(page: Page, testInfo: TestInfo) {
  await testInfo.attach('final-state', {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png',
  });
}
