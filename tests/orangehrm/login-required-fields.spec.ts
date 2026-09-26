import { test, expect } from '../../fixtures/testSetup';
import { orangeHrmUrls } from '../../config/urls';

test.describe('OrangeHRM Login Page', () => {
  test('Empty login submission shows required validation for both fields', async ({ page, loginPage }, testInfo) => {
    await loginPage.openLogin();
    await loginPage.assertCredentialsEmpty();
    await loginPage.submitLogin();
    await loginPage.assertRequiredCount(2);

    await expect(page).toHaveURL(orangeHrmUrls.login);
    await loginPage.assertLoginForm();
    await loginPage.attachFinalState(testInfo);
  });
});
