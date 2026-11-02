import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly pageTitle: Locator;
  readonly backpackItem: Locator;
  readonly addToCartButtons: Locator;

  constructor(page: Page) {
    this.pageTitle = page.getByText('Products', { exact: true });
    this.backpackItem = page.getByText('Sauce Labs Backpack', { exact: true });
    this.addToCartButtons = page.getByRole('button', { name: /Add to cart/i });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.pageTitle).toBeVisible();
  }

  async expectProductList(): Promise<void> {
    await expect(this.backpackItem).toHaveText('Sauce Labs Backpack');
    await expect(this.addToCartButtons).toHaveCount(6);
  }
}
