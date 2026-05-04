import { Page } from "@playwright/test";

export class apiDashboardPage{

    constructor (private readonly page:Page){}

    readonly items = this.page.locator('div.card:visible');
    readonly itemName = this.page.locator('div.card-body h5 b');
    readonly itemPrice = this.page.locator('.card-body .text-muted');
    readonly addToCartButton = this.page.locator('button').filter({ hasText: 'Add To Cart' })
    
}