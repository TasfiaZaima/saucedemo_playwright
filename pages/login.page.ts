import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.getByText(/Epic sadface/);

    // Alternative using the page's data-test attributes:
    // First add `testIdAttribute: 'data-test'` inside `use` in playwright.config.ts.
    // this.usernameInput = page.getByTestId('username');
    // this.passwordInput = page.getByTestId('password');
    // this.loginButton = page.getByTestId('login-button');

    // Alternative using the HTML IDs:
    // this.usernameInput = page.locator('#user-name');
    // this.passwordInput = page.locator('#password');
    // this.loginButton = page.locator('#login-button');
  }

  async open(): Promise<void> {
    await this.page.goto('/');
  }

  // Credentials are parameters so this page object can log in different users.
  // The test supplies the data, while this method handles the page actions.
  //
  // A hardcoded alternative would be:
  // async login(): Promise<void> {
  //   await this.usernameInput.fill('standard_user');
  //   await this.passwordInput.fill('secret_sauce');
  //   await this.loginButton.click();
  // }
  // That is simpler for one demo account, but it makes this page object less reusable.
  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginFormVisible(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async expectLoginErrorVisible(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
  }
}
