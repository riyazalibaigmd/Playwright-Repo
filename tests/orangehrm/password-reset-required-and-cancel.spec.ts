import { test, expect } from '@playwright/test';
import { attachFinalState } from './helpers';

test.describe('OrangeHRM Login Page', () => {
  test('Password-reset form requires a username and Cancel returns to login', async ({ page }, testInfo) => {
    const loginUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
    const resetUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode';

    // 1. Start from a fresh browser context at the login URL and select Forgot your password?.
    await page.goto(loginUrl, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(loginUrl);
    await page.getByText('Forgot your password?').click();
    await expect(page).toHaveURL(resetUrl);
    await expect(page.getByRole('heading', { name: 'Reset Password' })).toBeVisible();
    await expect(page.getByText('Please enter your username to identify your account to reset your password')).toBeVisible();
    const usernameField = page.getByRole('textbox', { name: 'Username' });
    await expect(usernameField).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reset Password' })).toBeVisible();

    // 2. Leave Username empty and select Reset Password.
    await expect(usernameField).toHaveValue('');
    await page.getByRole('button', { name: 'Reset Password' }).click();
    await expect(page.getByText('Required')).toBeVisible();
    await expect(page).toHaveURL(resetUrl);
    await expect(page.getByText(/password reset (link sent|email)/i)).toHaveCount(0);

    // 3. Select Cancel.
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page).toHaveURL(loginUrl);
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
    await expect(page.getByText(/password reset (link sent|email)/i)).toHaveCount(0);
    await attachFinalState(page, testInfo);
  });
});