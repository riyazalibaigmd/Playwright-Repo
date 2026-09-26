import { readFileSync } from 'node:fs';
import path from 'node:path';
import { test, expect } from '../fixtures';
import { OrangeHRMLoginPage } from '../pages/orangehrm-login.page';

const testData = JSON.parse(
  readFileSync(path.resolve(__dirname, '../../data/testData.json'), 'utf8')
);

const { invalidUserName, invalidPassword } = testData.orangeHrm;

test.describe('OrangeHRM Login Page', () => {
  test('Invalid credentials are rejected with visible feedback', async ({ page, loginPage }, testInfo) => {
    await loginPage.openLogin();
    await loginPage.enterCredentials(invalidUserName, invalidPassword);
    await loginPage.assertCredentials(invalidUserName, invalidPassword);
    await loginPage.submitLogin();
    await loginPage.assertInvalidCredentials();

    await expect(page).toHaveURL(OrangeHRMLoginPage.loginUrl);
    await loginPage.assertLoginForm();
    await loginPage.attachFinalState(testInfo);
  });
});
