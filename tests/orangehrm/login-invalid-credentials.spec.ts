import { test, expect } from '@playwright/test';
import { attachFinalState } from './helpers';

test.describe('OrangeHRM Login Page', () => {
  test('Invalid credentials are rejected with visible feedback', async ({ page }, testInfo) => {
    // 1. Enter invalid-user and invalid-password from a fresh login page.
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { waitUntil: 'domcontentloaded' });
    const usernameInput = page.getByRole('textbox', { name: 'Username' });
    const passwordInput = page.getByRole('textbox', { name: 'Password' });
    await usernameInput.fill('invalid-user');
    await passwordInput.fill('invalid-password');
    await expect(usernameInput).toHaveValue('invalid-user');
    await expect(passwordInput).toHaveValue('invalid-password');

    // 2. Select Login and verify rejection without entering the dashboard.
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Invalid credentials')).toBeVisible();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await attachFinalState(page, testInfo);
  });
});
