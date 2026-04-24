import { Page } from "@playwright/test";

export class CartPage{

    constructor (private readonly page:Page){}

    readonly checkout = this.page.getByRole('link', {name: 'Proceed To Checkout'});
    readonly productName = this.page.locator('.cart_description h4');
    readonly productPrice = this.page.locator('.cart_price p');
    readonly productQuantity = this.page.locator('.cart_quantity button');
    readonly totalCost = this.page.locator('.cart_total p');





}