import { Page, Locator, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const dataPath = path.resolve(__dirname, "../utility/login.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

class LoginPage {
    page: Page;
    loginButton: Locator;
    email: Locator;
    password: Locator;
    loginBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginButton = page.locator('//i[@class="fa fa-lock"]');
        this.email = page.locator('//input[@data-qa="login-email"]');
        this.password = page.locator('//input[@data-qa="login-password"]');
        this.loginBtn = page.locator('//button[@data-qa="login-button"]');
    }

    async loginUser() {
        await this.loginButton.click();
        await expect(this.email).toBeVisible();

        await this.email.fill(data.signUpEmail);
        await expect(this.email).toHaveValue(data.signUpEmail);

        await this.password.fill(data.password);
        await expect(this.password).toHaveValue(data.password);

        await this.loginBtn.click();
        await expect(this.page.locator('//a[contains(text(),"Logged in as")]')).toBeVisible();
    }
}

export default LoginPage;