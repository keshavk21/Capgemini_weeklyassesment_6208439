import { Locator,Page } from "@playwright/test";
class Area{
    stateTf:Locator;
    page:Page
    constructor(page:Page){
        this.page=page;
        this.stateTf=this.page.locator("#stateSearchInputId")
    }
    async convertArea(page:Page){
        await this.stateTf.fill("Rajasthan")
        await page.getByText("Rajasthan").click();
        await page.getByPlaceholder("Enter No. of Units").fill("1000")
        let value=await page.locator('//div[@class="areaCalc__cnvrtrSec__inputUnit"]').textContent();
        console.log(value);
        
    }
}
export default Area;