import { Page, expect } from '@playwright/test';
import { PageObjectManager } from '../objects-respo/pageObjectManager';

export class CommonUtility {

    //move to product details page
    async moveToProductDetailsSections(page: Page, desiredProduct: string){

        const pomanager = new PageObjectManager(page);

        //get the no of product avaliable in feature section
        const productcount = await pomanager.products.featureProductList.count();

        //loop through all the products 
        for (let i = 0; i < productcount; i++) {
            let productName = await pomanager.products.dressName.nth(i).innerText();
            if (productName === desiredProduct) {
                let desiredProductPrice: string = await pomanager.products.dressPrice.nth(i).innerText();
                await pomanager.products.viewProductButton.nth(i).click();
            }
        }
    }

    //add to cart
    async addToCart(page: Page, desiredQuantity: string) {

        const pomanager = new PageObjectManager(page);

        await pomanager.productDetailsPage.enterQuantity(desiredQuantity);
        await pomanager.productDetailsPage.clickAddToCart();
    }

    //calculate single product total cost
    async totalSingleProductValue(page: Page) {
        const pomanager = new PageObjectManager(page);

        const rawPrice = await pomanager.cartPage.productPrice.innerText();

        // Remove currency text, commas, spaces, keep digits + decimal
        const price = Number(rawPrice.replace("Rs.", "").replace(/,/g, "").trim());

        const quantityText = await pomanager.cartPage.productQuantity.innerText();
        const quantity = Number(quantityText.trim());
        return price * quantity;
    }

}