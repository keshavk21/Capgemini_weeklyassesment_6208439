import { test } from '@playwright/test';
import SignUpPage from '../pageObjectModel/signUp.page.ts';
import LoginPage from '../pageObjectModel/login.page.ts';
import Products from '../pageObjectModel/products.page.ts';
import ContactPage from '../pageObjectModel/getintouch.page.ts';

test('Login or Signup', async ({ page }) => {

    const signUpPage = new SignUpPage(page);
    const loginPage = new LoginPage(page);
    const productPage = new Products(page);
    const contactPage = new ContactPage(page);
    await page.goto("https://automationexercise.com/");
    await signUpPage.navigateToSignup();
    await signUpPage.enterSignupDetails();
    const exist = await signUpPage.userExist();
    if (exist) {
        console.log("User already exists:Logging in");
        await loginPage.loginUser();
    } else {
        console.log("New user:Signing up");
        await signUpPage.completeSignup();
    }
    await productPage.getProduct();
    await contactPage.goto();
    await contactPage.fillContactForm();
    await contactPage.uploadFile();

});