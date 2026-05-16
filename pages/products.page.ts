import { Page, Locator, expect  } from "@playwright/test";

export class ProductsPage {

    constructor (private readonly page: Page) {}

   readonly featureProductList = this.page.locator('.features_items .product-image-wrapper');
   readonly dressName = this.page.locator('.features_items .productinfo p');
   readonly dressPrice = this.page.locator('.features_items .productinfo h2');
   readonly viewProductButton = this.page.locator('.choose'); 
}