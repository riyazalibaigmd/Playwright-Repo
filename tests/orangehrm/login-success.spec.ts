import { readFileSync } from 'node:fs';
import path from 'node:path';
import { test, expect } from '../../fixtures/testSetup';
import { orangeHrmUrls } from '../../config/urls';

const testData = JSON.parse(
  readFileSync(path.resolve(__dirname, '../../data/testData.json'), 'utf8')
);

const { demoUserName, demoPassword } = testData.orangeHrm;

test.describe('OrangeHRM Login Page', () => {
  test('Successful login with page-displayed demo credentials', async ({ page, loginPage }, testInfo) => {
    await loginPage.openLogin();
    await loginPage.assertLoginForm();
    await loginPage.assertDemoCredentials(demoUserName, demoPassword);
    await loginPage.enterCredentials(demoUserName, demoPassword);
    await loginPage.submitLogin();

    await expect(page).toHaveURL(orangeHrmUrls.dashboard);
    await loginPage.assertDashboard();
    await loginPage.attachFinalState(testInfo);
  });
});
