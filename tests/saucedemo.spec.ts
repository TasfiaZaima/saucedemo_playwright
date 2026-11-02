import { test } from '@playwright/test';
import { CartPage } from '../pages/cart.page';
import { InventoryPage } from '../pages/inventory.page';
import { LoginPage } from '../pages/login.page';

test.describe('Authenticated shopping tests', () => {
  test.beforeEach(async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    // Authentication was performed once in auth.setup.ts.
    // Each test now opens the inventory page using the saved storage state.
    await inventoryPage.open();
  });

  test('user can log in and see the inventory', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.expectLoaded();
    await inventoryPage.expectProductList();
  });

  test('adding one product updates the cart count', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.expectCartCount(1);
  });

  test('added product appears in the cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();

    await cartPage.expectProductVisible('Sauce Labs Backpack');
    await cartPage.expectProductCount(1);
  });

  test('adding two products updates the cart count to two', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.addProductToCart('Sauce Labs Bike Light');

    await inventoryPage.expectCartCount(2);
  });

  test('user can remove a product from the cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();
    await cartPage.removeProduct('Sauce Labs Backpack');

    await cartPage.expectProductCount(0);
  });

  test('user can remove a product directly from the inventory', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.removeProductFromInventory('Sauce Labs Backpack');

    await inventoryPage.expectCartEmpty();
  });
});

test.describe('Login tests', () => {
  // These tests must start logged out, so do not load the saved auth state.
  test.use({ storageState: { cookies: [], origins: [] } });

  test('login form is displayed', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.expectLoginFormVisible();
  });

  test('invalid credentials display a login error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('invalid_user', 'wrong_password');

    await loginPage.expectLoginErrorVisible();
  });
});
