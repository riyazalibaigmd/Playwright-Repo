import { test, expect } from '../fixtures';
import { OrangeHRMLoginPage } from '../pages/orangehrm-login.page';

test.describe('OrangeHRM Login Page', () => {
  test('Invalid credentials are rejected with visible feedback', async ({ page, loginPage }, testInfo) => {
    await loginPage.openLogin();
    await loginPage.enterCredentials('invalid-user', 'invalid-password');
    await loginPage.assertCredentials('invalid-user', 'invalid-password');
    await loginPage.submitLogin();
    await loginPage.assertInvalidCredentials();

    await expect(page).toHaveURL(OrangeHRMLoginPage.loginUrl);
    await loginPage.assertLoginForm();
    await loginPage.attachFinalState(testInfo);
  });
});
