import { Page } from "@playwright/test";

export class CheckOutPage{

    constructor (private readonly page:Page){}

    readonly checkOutProductsList = this.page.locator('.table-condensed');
    readonly cartTotalAmount =this.page.locator('table.table-condensed tbody tr:last-child td:last-child')
    readonly placeOrder = this.page.getByRole('link', { name: 'Place Order' })

    async placeTheOrder(){
        await this.placeOrder.click();
    }
}