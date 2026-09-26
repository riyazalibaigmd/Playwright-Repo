import { test, expect } from '@playwright/test';
import { attachFinalState } from './helpers';

test.describe('OrangeHRM Login Page', () => {
  test('Empty login submission shows required validation for both fields', async ({ page }, testInfo) => {
    // 1. Start from a fresh browser context at the login URL and leave Username and Password empty.
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { waitUntil: 'domcontentloaded' });
    const usernameInput = page.getByRole('textbox', { name: 'Username' });
    const passwordInput = page.getByRole('textbox', { name: 'Password' });
    await expect(usernameInput).toBeEmpty();
    await expect(passwordInput).toBeEmpty();

    // 2. Select Login without entering either value and verify both required messages.
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Required', { exact: true })).toHaveCount(2);
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await attachFinalState(page, testInfo);
  });
});
