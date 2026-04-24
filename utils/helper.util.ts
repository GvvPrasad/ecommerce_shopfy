import { Page } from '@playwright/test';
import { PageObjectManager } from '../page-objects/pageObjectManager';

export class Helper {

    async moveToProductDetails(page: Page, desiredProduct: string): Promise<string | undefined> {
        const pomanager = new PageObjectManager(page);

        //get the no of product avaliable in feature section
        const productcount = await pomanager.homePage.featureProductItems.count();

        //loop through all the products 
        for (let i = 0; i < productcount; i++) {
            let productName = await pomanager.homePage.dressName.nth(i).innerText();
            if (productName === desiredProduct) {
                let desiredProductPrice: string = await pomanager.homePage.dressPrice.nth(i).innerText();
                await pomanager.homePage.viewProduct.nth(i).click();
                return desiredProductPrice;
            }
        }
    }

}