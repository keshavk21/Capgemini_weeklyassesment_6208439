import { test } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import ContactPage from '../pageObjectModel/getintouch.page.ts';

test('Contact Form - Data Driven', async ({ page }) => {

    const dataPath = path.join(__dirname, '../utility/data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const contactPage = new ContactPage(page);
    await contactPage.goto();
    await contactPage.fillContactForm();
    await contactPage.uploadFile();
    await contactPage.submitForm();
    await contactPage.verifySuccess();
});