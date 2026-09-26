import { test, expect } from '@playwright/test';
import { attachFinalState } from './helpers';

test.describe('OrangeHRM Login Page', () => {
  test('Successful login with page-displayed demo credentials', async ({ page }, testInfo) => {
    // 1. Start from a fresh browser context at the login URL and confirm the displayed demo credentials.
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { waitUntil: 'domcontentloaded' });

    const usernameInput = page.getByRole('textbox', { name: 'Username' });
    const passwordInput = page.getByRole('textbox', { name: 'Password' });
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await expect(page.getByText('Username : Admin')).toBeVisible();
    await expect(page.getByText('Password : admin123')).toBeVisible();

    // 2. Enter Admin and admin123, select Login, and verify the authenticated dashboard.
    await usernameInput.fill('Admin');
    await passwordInput.fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
    await attachFinalState(page, testInfo);
  });
});
