import { Locator,Page } from "@playwright/test";
class Chat{
    page:Page;
    inputTf:Locator;
    constructor(page:Page){
        this.page=page;
        this.inputTf=this.page.locator("#msg_input");
    }
    async sendText(){
        await this.inputTf.fill("Capgemini itni acchi kyu hai");
        await this.page.locator('//i[@class="icon-send"]').click();
    }
}
export default Chat;