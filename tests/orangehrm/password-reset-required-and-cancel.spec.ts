import { test, expect } from '../../fixtures/testSetup';
import { orangeHrmUrls } from '../../config/urls';

test.describe('OrangeHRM Login Page', () => {
  test('Password-reset form requires a username and Cancel returns to login', async ({ page, loginPage }, testInfo) => {
    await loginPage.openLogin();
    await expect(page).toHaveURL(orangeHrmUrls.login);
    await loginPage.openPasswordReset();
    await expect(page).toHaveURL(orangeHrmUrls.reset);
    await loginPage.assertPasswordResetForm();

    await loginPage.assertResetUsernameEmpty();
    await loginPage.submitPasswordReset();
    await loginPage.assertRequiredCount(1);
    await expect(page).toHaveURL(orangeHrmUrls.reset);
    await loginPage.assertNoResetConfirmation();

    await loginPage.cancelPasswordReset();
    await expect(page).toHaveURL(orangeHrmUrls.login);
    await loginPage.assertLoginForm();
    await loginPage.assertNoResetConfirmation();
    await loginPage.attachFinalState(testInfo);
  });
});