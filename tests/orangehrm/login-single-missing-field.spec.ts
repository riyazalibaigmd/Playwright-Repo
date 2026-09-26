import { readFileSync } from 'node:fs';
import path from 'node:path';
import { test, expect } from '../fixtures';
import { OrangeHRMLoginPage } from '../pages/orangehrm-login.page';

const testData = JSON.parse(
  readFileSync(path.resolve(__dirname, '../../data/testData.json'), 'utf8')
);

const { demoUserName, anyPassword } = testData.orangeHrm;

test.describe('OrangeHRM Login Page', () => {
  test('Required validation identifies whichever login field is missing', async ({ page, loginPage }, testInfo) => {
    await loginPage.openLogin();
    await loginPage.enterUsername(demoUserName);
    await loginPage.submitLogin();
    await loginPage.assertRequiredCount(1);
    await loginPage.assertUsernameValue(demoUserName);
    await loginPage.assertPasswordValue('');
    await expect(page).toHaveURL(OrangeHRMLoginPage.loginUrl);

    await loginPage.openLogin();
    await loginPage.enterPassword(anyPassword);
    await loginPage.submitLogin();
    await loginPage.assertRequiredCount(1);
    await loginPage.assertUsernameValue('');
    await loginPage.assertPasswordValue(anyPassword);
    await expect(page).toHaveURL(OrangeHRMLoginPage.loginUrl);
    await loginPage.attachFinalState(testInfo);
  });
});
