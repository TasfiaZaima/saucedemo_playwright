import { test } from '@playwright/test';
import { InventoryPage } from '../pages/inventory.page';
import { LoginPage } from '../pages/login.page';

test('user can log in and see the inventory', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.open();
  await loginPage.expectLoginFormVisible();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventoryPage.expectLoaded();
  await inventoryPage.expectProductList();
});
