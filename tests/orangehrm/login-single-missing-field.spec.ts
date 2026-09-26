import { test, expect } from '../fixtures';
import { OrangeHRMLoginPage } from '../pages/orangehrm-login.page';

test.describe('OrangeHRM Login Page', () => {
  test('Required validation identifies whichever login field is missing', async ({ page, loginPage }, testInfo) => {
    await loginPage.openLogin();
    await loginPage.enterUsername('Admin');
    await loginPage.submitLogin();
    await loginPage.assertRequiredCount(1);
    await loginPage.assertUsernameValue('Admin');
    await loginPage.assertPasswordValue('');
    await expect(page).toHaveURL(OrangeHRMLoginPage.loginUrl);

    await loginPage.openLogin();
    await loginPage.enterPassword('any-password');
    await loginPage.submitLogin();
    await loginPage.assertRequiredCount(1);
    await loginPage.assertUsernameValue('');
    await loginPage.assertPasswordValue('any-password');
    await expect(page).toHaveURL(OrangeHRMLoginPage.loginUrl);
    await loginPage.attachFinalState(testInfo);
  });
});
