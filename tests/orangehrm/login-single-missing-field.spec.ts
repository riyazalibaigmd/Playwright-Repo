import { test, expect } from '@playwright/test';
import { attachFinalState } from './helpers';

test.describe('OrangeHRM Login Page', () => {
  test('Required validation identifies whichever login field is missing', async ({ page }, testInfo) => {
    // 1. Enter Admin in Username, leave Password empty, and submit the login form.
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { waitUntil: 'domcontentloaded' });
    const usernameInput = page.getByRole('textbox', { name: 'Username' });
    const passwordInput = page.getByRole('textbox', { name: 'Password' });
    await usernameInput.fill('Admin');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Required', { exact: true })).toHaveCount(1);
    await expect(usernameInput).toHaveValue('Admin');
    await expect(passwordInput).toBeEmpty();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // 2. Reload the login URL, enter a Password only, and submit the login form.
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { waitUntil: 'domcontentloaded' });
    await expect(usernameInput).toBeEmpty();
    await passwordInput.fill('any-password');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Required', { exact: true })).toHaveCount(1);
    await expect(usernameInput).toBeEmpty();
    await expect(passwordInput).toHaveValue('any-password');
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await attachFinalState(page, testInfo);
  });
});
