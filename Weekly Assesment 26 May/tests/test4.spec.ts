import { test, expect } from '@playwright/test';
import LoginPage from "../pages/login.page"
import Area from '../pages/areaConverter.page';
import Home from '../pages/Home.page';
test('Convert Area', async ({ page,context }) => {
    await page.goto("https://www.magicbricks.com/")
    const loginPage=new LoginPage(page);
    const homePage=new Home(page);
    const areaPage=new Area(page);
    await loginPage.login();
    const convertAreaPage=await homePage.areaConversion();
    await areaPage.convertArea(convertAreaPage);
    
    
});