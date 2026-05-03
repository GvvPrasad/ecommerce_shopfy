<<<<<<< HEAD
import { Page } from '@playwright/test';
=======
import { Page, expect } from '@playwright/test';
>>>>>>> gvv
import { PageObjectManager } from '../page-objects/pageObjectManager';

export class Helper {

<<<<<<< HEAD
    async moveToProductDetails(page: Page, desiredProduct: string): Promise<string | undefined> {
=======
    //move to product details page
    async moveToProductDetails(page: Page, desiredProduct: string): Promise<string | undefined> {

>>>>>>> gvv
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

<<<<<<< HEAD
=======
    //add to cart
    async addToCart(page: Page, desiredQuantity: string) {

        const pomanager = new PageObjectManager(page);

        await pomanager.productDetailsPage.enterQuantity(desiredQuantity);
        await pomanager.productDetailsPage.clickAddToCart();
    }

    //calculate single product total cost
    async totalProductValue(page: Page) {
        const pomanager = new PageObjectManager(page);

        const rawPrice = await pomanager.cartPage.productPrice.innerText();
        console.log("raw price of individual product: " + rawPrice)

        // Remove currency text, commas, spaces, keep digits + decimal
        const price = Number(rawPrice.replace("Rs.", "").replace(/,/g, "").trim());
        console.log("price in number: " + price);

        const quantityText = await pomanager.cartPage.productQuantity.innerText();
        const quantity = Number(quantityText.trim());
        return price * quantity;
    }

    //validate product details in cart
    async validatePurchaseDetail(page: Page, desiredProduct: string, desiredProductPrice: string, desiredQuantity: string) {
        const pomanager = new PageObjectManager(page);

        await expect(pomanager.cartPage.productName).toBeVisible();
        await expect(pomanager.cartPage.productName).toHaveText(desiredProduct)
        await expect(pomanager.cartPage.productPrice).toHaveText(desiredProductPrice!);
        await expect(pomanager.cartPage.productQuantity).toHaveText(desiredQuantity);
    }
>>>>>>> gvv
}