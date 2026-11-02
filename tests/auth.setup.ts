import { expect, test as setup } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { LoginPage } from '../pages/login.page';

// This is the same path configured in playwright.config.ts.
const authFile = 'playwright/.auth/user.json';

setup('authenticate once', async ({ page }) => {
  // Make sure the ignored .auth directory exists before saving the state file.
  fs.mkdirSync(path.dirname(authFile), { recursive: true });

  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');

  // Wait until login is complete before saving cookies and local storage.
  await expect(page.getByText('Products', { exact: true })).toBeVisible();

  // Save the authenticated browser context for all dependent test projects.
  await page.context().storageState({ path: authFile });
});
