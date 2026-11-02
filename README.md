# SauceDemo Playwright TypeScript POM

This project demonstrates a basic Playwright login flow against the public [SauceDemo](https://www.saucedemo.com/) site using the Page Object Model.

## Run the tests

```bash
npm test
npm run test:headed
```

The example test uses these Playwright basics:

- `page.goto('/')` opens the configured base URL.
- `getByRole()`, `getByLabel()`, and `getByText()` locate elements by accessible user-facing meaning.
- `fill()` enters credentials and `click()` submits the login form.
- `toBeVisible()`, `toHaveText()`, and `toHaveCount()` verify the login form and inventory.

## Record a flow with Codegen

```bash
npx playwright codegen https://www.saucedemo.com/
# or
npm run codegen
```

Use the demo credentials `standard_user` / `secret_sauce` when recording a login flow.
