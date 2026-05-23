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
                await pomanager.products.viewProductButton.nth(i).click();
                break;
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
    async totalSingleProductValue(page: Page, desiredProduct:string ) {
        const pomanager = new PageObjectManager(page);

        //get the number of products
        const productcount = await pomanager.cartPage.cartProductList.count()

        //loop through the 
        for (let i = 0; i < productcount; i++) {
            let addedProductname = await pomanager.cartPage.productName.nth(i).innerText()
            if (addedProductname !== desiredProduct) {
                throw new Error(`${addedProductname} is not the desirec product from the list`);
                break;
            }else{
                // get price
                const productPriceText = await pomanager.cartPage.productPrice.nth(i).innerText();
                const productPrice =  Number(productPriceText.replace("Rs.", "").replace(/,/g, "").trim());

                //check quantity
                if
            }

        }
    }

}