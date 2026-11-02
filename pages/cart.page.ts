import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
  }

  private cartItem(productName: string): Locator {
    return this.cartItems.filter({ hasText: productName });
  }

  async expectProductVisible(productName: string): Promise<void> {
    await expect(this.cartItem(productName)).toBeVisible();
  }

  async expectProductCount(count: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(count);
  }

  async removeProduct(productName: string): Promise<void> {
    await this.cartItem(productName)
      .getByRole('button', { name: /Remove/i })
      .click();
  }
}
