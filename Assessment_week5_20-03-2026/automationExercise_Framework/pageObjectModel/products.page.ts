import {Page, Locator, expect} from '@playwright/test'

class Products{
        page: Page
        data:any
        product: Locator
        addtoCart: Locator
        continueShopping: Locator
        viewCart: Locator
        checkOut: Locator
        payment: Locator

        constructor(page:Page){
            this.page=page;
            this.product=page.locator('//a[@href="/products"]')
            this.addtoCart=page.locator('//a[@data-product-id="1"]').first()
            this.continueShopping=page.locator('//button[@class="btn btn-success close-modal btn-block"]')
            this.viewCart=page.locator('//ul[@class="nav navbar-nav"]/descendant::a[@href="/view_cart"]')
            this.checkOut=page.locator('//a[@class="btn btn-default check_out"]')
            this.payment=page.locator('//a[@class="btn btn-default check_out"]')

        }

        async getProduct(){
            await this.product.click()
            await expect(this.page).toHaveURL(/.*products/)

            await this.addtoCart.click()
            await expect(this.continueShopping).toBeVisible()

            await this.continueShopping.click()

            await this.viewCart.click()
            await expect(this.page).toHaveURL(/.*view_cart/)

            await this.checkOut.click()
            await expect(this.page.locator('#address_delivery')).toBeVisible()

            await this.checkOut.click()
        }
}

export default Products;