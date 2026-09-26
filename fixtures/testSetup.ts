import { test as base, expect } from '@playwright/test';
import { OrangeHRMLoginPage } from '../tests/pages/orangehrm-login.page';

type Fixtures = {
  loginPage: OrangeHRMLoginPage;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new OrangeHRMLoginPage(page));
  },
});

export { expect, OrangeHRMLoginPage };