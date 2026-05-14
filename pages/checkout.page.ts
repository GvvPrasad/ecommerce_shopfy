import { Page } from "@playwright/test";

export class CheckOutPage{

    constructor (private readonly page:Page){}

    readonly checkoutProducts = this.page.locator('.table-condensed');
    readonly placeOrder = this.page.getByRole('link', { name: 'Place Order' })

    async placeTheOrder(){
        await this.placeOrder.click();
    }
}