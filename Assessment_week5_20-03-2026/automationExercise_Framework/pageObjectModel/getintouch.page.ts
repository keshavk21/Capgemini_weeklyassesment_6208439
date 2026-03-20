import { Page, Locator, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const dataPath = path.resolve(__dirname, "../utility/data.json");
const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

export default class ContactPage {
    page: Page;
    data:any;
    nameInput: Locator;
    emailInput: Locator;
    subjectInput: Locator;
    messageInput: Locator;
    fileUpload: Locator;
    submitBtn: Locator;

    constructor(page: Page) {
        this.page = page;

        this.nameInput = page.locator('//input[@data-qa="name"]');
        this.emailInput = page.locator('//input[@data-qa="email"]');
        this.subjectInput = page.locator('//input[@data-qa="subject"]');
        this.messageInput = page.locator('//textarea[@data-qa="message"]');
        this.fileUpload = page.locator('//input[@name="upload_file"]');
        this.submitBtn = page.locator('//input[@data-qa="submit-button"]');
    }

    async goto() {
        await this.page.goto('https://automationexercise.com/contact_us');
        await expect(this.page).toHaveURL(/.*contact_us/);
        await expect(this.page.locator('//h2[contains(text(),"Get In Touch")]')).toBeVisible();
    }

    async fillContactForm() {
        await this.nameInput.fill(data.name);
        await expect(this.nameInput).toHaveValue(data.name);

        await this.emailInput.fill(data.email);
        await expect(this.emailInput).toHaveValue(data.email);

        await this.subjectInput.fill(data.subject);
        await expect(this.subjectInput).toHaveValue(data.subject);

        await this.messageInput.fill(data.message);
        await expect(this.messageInput).toHaveValue(data.message);
    }

    async uploadFile() {
        await this.fileUpload.setInputFiles(data.filePath);
    }

    async submitForm() {
        this.page.on('dialog', async dialog => {
            await dialog.accept();
        });
        await this.submitBtn.click();
    }

    async verifySuccess() {
        await expect(this.page.locator('.status')).toContainText('Success');
    }
}