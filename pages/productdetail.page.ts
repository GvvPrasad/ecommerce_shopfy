import { Page } from "@playwright/test";

export class ProductDetailsPage {
    constructor(private readonly page:Page){}

    readonly productName = this.page.locator('.product-information h2');
    readonly productCategory = this.page.locator('.product-information p').first();
    readonly productPrice = this.page.getByText('Rs.');   


}