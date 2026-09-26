import { readFileSync } from 'node:fs';
import path from 'node:path';
import { test, expect } from '../../fixtures/testSetup';
import { orangeHrmUrls } from '../../config/urls';

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
    await expect(page).toHaveURL(orangeHrmUrls.login);

    await loginPage.openLogin();
    await loginPage.enterPassword(anyPassword);
    await loginPage.submitLogin();
    await loginPage.assertRequiredCount(1);
    await loginPage.assertUsernameValue('');
    await loginPage.assertPasswordValue(anyPassword);
    await expect(page).toHaveURL(orangeHrmUrls.login);
    await loginPage.attachFinalState(testInfo);
  });
});
