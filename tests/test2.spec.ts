import { test, expect } from '@playwright/test';
import LoginPage from "../pages/login.page"
import Home from '../pages/Home.page';
import CheckWorth from '../pages/checkWorth.page';
test('Check Property Worth', async ({ page,context }) => {
    await page.goto("https://www.magicbricks.com/")
    const loginPage=new LoginPage(page);
    const homePage=new Home(page);
    await loginPage.login();
    let worthPage=await homePage.getPropWorth();
    const checkWorthPage=new CheckWorth(worthPage);
    await checkWorthPage.getWorth(); 
    await checkWorthPage.fillDetails();

    

});