import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly backpackItem: Locator;
  readonly addToCartButtons: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.getByText('Products', { exact: true });
    this.backpackItem = page.getByText('Sauce Labs Backpack', { exact: true });
    this.addToCartButtons = page.getByRole('button', { name: /Add to cart/i });
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
  }

  async open(): Promise<void> {
    // The saved storage state keeps the user logged in when this page opens.
    await this.page.goto('/inventory.html');
  }

  async expectProductList(): Promise<void> {
    await expect(this.backpackItem).toHaveText('Sauce Labs Backpack');
    await expect(this.addToCartButtons).toHaveCount(6);
  }

  private productCard(productName: string): Locator {
    return this.page.locator('.inventory_item').filter({ hasText: productName });
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.productCard(productName)
      .getByRole('button', { name: /Add to cart/i })
      .click();
  }

  async removeProductFromInventory(productName: string): Promise<void> {
    await this.productCard(productName)
      .getByRole('button', { name: /Remove/i })
      .click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async expectCartCount(count: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async expectCartEmpty(): Promise<void> {
    await expect(this.cartBadge).toHaveCount(0);
  }
}
