import { expect, type Page, type TestInfo } from '@playwright/test';

export class OrangeHRMLoginPage {
  static readonly loginUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
  static readonly resetUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode';
  static readonly dashboardUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index';

  constructor(private readonly page: Page) {}

  async openLogin() {
    await this.page.goto(OrangeHRMLoginPage.loginUrl, { waitUntil: 'domcontentloaded' });
  }

  async assertLoginForm() {
    await expect(this.page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(this.page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Login' })).toBeVisible();
  }

  async assertDemoCredentials() {
    await expect(this.page.getByText('Username : Admin')).toBeVisible();
    await expect(this.page.getByText('Password : admin123')).toBeVisible();
  }

  async assertCredentialsEmpty() {
    await expect(this.page.getByRole('textbox', { name: 'Username' })).toBeEmpty();
    await expect(this.page.getByRole('textbox', { name: 'Password' })).toBeEmpty();
  }

  async enterCredentials(username: string, password: string) {
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
  }

  async enterUsername(username: string) {
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
  }

  async enterPassword(password: string) {
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
  }

  async assertCredentials(username: string, password: string) {
    await expect(this.page.getByRole('textbox', { name: 'Username' })).toHaveValue(username);
    await expect(this.page.getByRole('textbox', { name: 'Password' })).toHaveValue(password);
  }

  async submitLogin() {
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async assertRequiredCount(count: number) {
    await expect(this.page.getByText('Required', { exact: true })).toHaveCount(count);
  }

  async assertInvalidCredentials() {
    await expect(this.page.getByText('Invalid credentials')).toBeVisible();
  }

  async assertUsernameValue(value: string) {
    await expect(this.page.getByRole('textbox', { name: 'Username' })).toHaveValue(value);
  }

  async assertPasswordValue(value: string) {
    await expect(this.page.getByRole('textbox', { name: 'Password' })).toHaveValue(value);
  }

  async assertDashboard() {
    await expect(this.page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
  }

  async openPasswordReset() {
    await this.page.getByText('Forgot your password?').click();
  }

  async assertPasswordResetForm() {
    await expect(this.page.getByRole('heading', { name: 'Reset Password' })).toBeVisible();
    await expect(this.page.getByText('Please enter your username to identify your account to reset your password')).toBeVisible();
    await expect(this.page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Reset Password' })).toBeVisible();
  }

  async assertResetUsernameEmpty() {
    await expect(this.page.getByRole('textbox', { name: 'Username' })).toBeEmpty();
  }

  async submitPasswordReset() {
    await this.page.getByRole('button', { name: 'Reset Password' }).click();
  }

  async assertNoResetConfirmation() {
    await expect(this.page.getByText(/password reset (link sent|email)/i)).toHaveCount(0);
  }

  async cancelPasswordReset() {
    await this.page.getByRole('button', { name: 'Cancel' }).click();
  }

  async attachFinalState(testInfo: TestInfo) {
    await testInfo.attach('final-state', {
      body: await this.page.screenshot({ fullPage: true }),
      contentType: 'image/png',
    });
  }
}