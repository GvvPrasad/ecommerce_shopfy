import { Page, Locator, expect  } from "@playwright/test";

export class HomePage {

    constructor (private readonly page: Page) {}

   readonly featureProductItems = this.page.locator('.features_items .product-image-wrapper');
   readonly dressPrice = this.page.locator('.features_items .productinfo h2');
   readonly dressName = this.page.locator('.features_items .productinfo p');
   readonly viewProduct = this.page.locator('.choose'); 

    async launchApp(){
        await this.page.goto('/');
    }

}