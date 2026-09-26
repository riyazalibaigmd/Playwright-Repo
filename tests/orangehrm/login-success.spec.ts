import { test, expect } from '../fixtures';
import { OrangeHRMLoginPage } from '../pages/orangehrm-login.page';

test.describe('OrangeHRM Login Page', () => {
  test('Successful login with page-displayed demo credentials', async ({ page, loginPage }, testInfo) => {
    await loginPage.openLogin();
    await loginPage.assertLoginForm();
    await loginPage.assertDemoCredentials();
    await loginPage.enterCredentials('Admin', 'admin123');
    await loginPage.submitLogin();

    await expect(page).toHaveURL(OrangeHRMLoginPage.dashboardUrl);
    await loginPage.assertDashboard();
    await loginPage.attachFinalState(testInfo);
  });
});
