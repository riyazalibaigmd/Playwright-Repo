import { test, expect } from '../fixtures';
import { OrangeHRMLoginPage } from '../pages/orangehrm-login.page';

test.describe('OrangeHRM Login Page', () => {
  test('Password-reset form requires a username and Cancel returns to login', async ({ page, loginPage }, testInfo) => {
    await loginPage.openLogin();
    await expect(page).toHaveURL(OrangeHRMLoginPage.loginUrl);
    await loginPage.openPasswordReset();
    await expect(page).toHaveURL(OrangeHRMLoginPage.resetUrl);
    await loginPage.assertPasswordResetForm();

    await loginPage.assertResetUsernameEmpty();
    await loginPage.submitPasswordReset();
    await loginPage.assertRequiredCount(1);
    await expect(page).toHaveURL(OrangeHRMLoginPage.resetUrl);
    await loginPage.assertNoResetConfirmation();

    await loginPage.cancelPasswordReset();
    await expect(page).toHaveURL(OrangeHRMLoginPage.loginUrl);
    await loginPage.assertLoginForm();
    await loginPage.assertNoResetConfirmation();
    await loginPage.attachFinalState(testInfo);
  });
});