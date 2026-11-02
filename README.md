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

## Reuse login with storage state

The `tests/auth.setup.ts` setup test logs in once and saves the authenticated browser state to `playwright/.auth/user.json`. The Chromium project depends on that setup and loads the saved state for every test, so the individual tests do not repeat the login steps.

```bash
npx playwright test
```

The saved authentication file is ignored by Git. If the session expires, delete `playwright/.auth/user.json` and run the tests again to create a fresh state.
