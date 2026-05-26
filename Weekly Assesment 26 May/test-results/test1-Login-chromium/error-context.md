# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: test1.spec.ts >> Login
- Location: tests\test1.spec.ts:3:5

# Error details

```
Error: locator.click: Target page, context or browser has been closed
```

# Test source

```ts
  1  | import { Locator, Page } from '@playwright/test';
  2  | import fs from 'fs';
  3  | 
  4  | const loginData = JSON.parse(
  5  |   fs.readFileSync('./test-data/login.json', 'utf-8')
  6  | );
  7  | 
  8  | class LoginPage {
  9  |   page: Page;
  10 |   loginHover: Locator;
  11 |   loginSignUp: Locator;
  12 | 
  13 |   constructor(page: Page) {
  14 |     this.page = page;
  15 | 
  16 |     this.loginHover = page.getByText('Login', { exact: true });
  17 |     this.loginSignUp = page.getByText('Login/Sign Up');
  18 |   }
  19 | 
  20 |   async login() {
  21 |     await this.loginHover.last().hover();
  22 | 
  23 |     const [popup] = await Promise.all([
  24 |       this.page.waitForEvent('popup'),
  25 |       this.loginSignUp.click()
  26 |     ]);
  27 | 
  28 |     await popup.waitForLoadState('domcontentloaded');
  29 | 
  30 |     await popup.locator('#emailOrMobileLable')
  31 |       .fill(loginData.mobile);
  32 |     await popup.pause();
  33 |     await popup.getByText('Next').click();
  34 |     await popup.pause();
  35 |     await popup.locator("//button[@onclick='verifyOtp()']")
> 36 |       .click();
     |        ^ Error: locator.click: Target page, context or browser has been closed
  37 |   }
  38 | }
  39 | 
  40 | export default LoginPage;
```