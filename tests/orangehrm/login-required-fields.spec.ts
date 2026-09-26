import { test, expect } from '../fixtures';
import { OrangeHRMLoginPage } from '../pages/orangehrm-login.page';

test.describe('OrangeHRM Login Page', () => {
  test('Empty login submission shows required validation for both fields', async ({ page, loginPage }, testInfo) => {
    await loginPage.openLogin();
    await loginPage.assertCredentialsEmpty();
    await loginPage.submitLogin();
    await loginPage.assertRequiredCount(2);

    await expect(page).toHaveURL(OrangeHRMLoginPage.loginUrl);
    await loginPage.assertLoginForm();
    await loginPage.attachFinalState(testInfo);
  });
});
