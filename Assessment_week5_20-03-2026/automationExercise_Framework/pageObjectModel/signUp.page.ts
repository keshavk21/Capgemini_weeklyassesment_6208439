import { Page, Locator, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const dataPath = path.resolve(__dirname, "../utility/signUp.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

class SignUpPage {
    page: Page;
    loginButton: Locator;
    signUpName: Locator;
    signUpEmail: Locator;
    signUpButton: Locator;
    signupError: Locator;
    title: Locator;
    password: Locator;
    day: Locator;
    month: Locator;
    year: Locator;
    firstName: Locator;
    lastName: Locator;
    company: Locator;
    address: Locator;
    address2: Locator;
    country: Locator;
    state: Locator;
    city: Locator;
    zipcode: Locator;
    mobileNumber: Locator;
    createAccount: Locator;
    continueBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginButton = page.locator('//i[@class="fa fa-lock"]');
        this.signUpName = page.locator('//input[@data-qa="signup-name"]');
        this.signUpEmail = page.locator('//input[@data-qa="signup-email"]');
        this.signUpButton = page.locator('//button[@data-qa="signup-button"]');
        this.signupError = page.locator('//p[text()="Email Address already exist!"]');
        this.title = page.locator("#id_gender1");
        this.password = page.locator("#password");
        this.day = page.locator('//select[@data-qa="days"]');
        this.month = page.locator('#months');
        this.year = page.locator('#years');
        this.firstName = page.locator('#first_name');
        this.lastName = page.locator('#last_name');
        this.company = page.locator('#company');
        this.address = page.locator('#address1');
        this.address2 = page.locator('#address2');
        this.country = page.locator('#country');
        this.state = page.locator('#state');
        this.city = page.locator('#city');
        this.zipcode = page.locator('#zipcode');
        this.mobileNumber = page.locator('#mobile_number');
        this.createAccount = page.locator('//button[@data-qa="create-account"]');
        this.continueBtn = page.locator('//a[@data-qa="continue-button"]');
    }

    async navigateToSignup() {
        await this.loginButton.click();
        await expect(this.signUpName).toBeVisible();
        await expect(this.signUpEmail).toBeVisible();
    }

    async enterSignupDetails() {
        await this.signUpName.fill(data.signUpName);
        await expect(this.signUpName).toHaveValue(data.signUpName);

        await this.signUpEmail.fill(data.signUpEmail);
        await expect(this.signUpEmail).toHaveValue(data.signUpEmail);

        await this.signUpButton.click();
    }

    async userExist(): Promise<boolean> {
        return await this.signupError
            .waitFor({ timeout: 3000 })
            .then(() => true)
            .catch(() => false);
    }

    async completeSignup() {
        await this.title.check();
        await expect(this.title).toBeChecked();

        await this.password.fill(data.password);
        await expect(this.password).toHaveValue(data.password);

        await this.day.selectOption({ label: data.day });
        await this.month.selectOption({ label: data.month });
        await this.year.selectOption({ label: data.year });

        await this.firstName.fill(data.firstName);
        await expect(this.firstName).toHaveValue(data.firstName);

        await this.lastName.fill(data.lastName);
        await expect(this.lastName).toHaveValue(data.lastName);

        await this.company.fill(data.company);
        await this.address.fill(data.address);
        await this.address2.fill(data.address2);
        await this.country.selectOption(data.country);
        await this.state.fill(data.state);
        await this.city.fill(data.city);
        await this.zipcode.fill(data.zipcode);
        await this.mobileNumber.fill(data.mobileNumber);

        await this.createAccount.click();
        await expect(this.page.locator('//b[text()="Account Created!"]')).toBeVisible();

        await this.continueBtn.click();
        await expect(this.page.locator('//a[contains(text(),"Logged in as")]')).toBeVisible();
    }
}

export default SignUpPage;