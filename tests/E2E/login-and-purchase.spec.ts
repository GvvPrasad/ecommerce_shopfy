import { test, expect } from '../../fixtures/base.fixture';
import { ENV_CONFIG } from '../../config/config.env'
import * as fs from 'fs';


test('Add to cart', async ({ page, pomanager }) => {

    //lanch Application
    await page.goto('/')

    //login
    await pomanager.header.goToLoginSignUpPage();
    await pomanager.loginSignup.userLogin(ENV_CONFIG.USER_EMAIL, ENV_CONFIG.USER_PASSWORD);

    //get the test data file
    const testdata = await pomanager.excelUtility.readExcel(pomanager.globalObjects.excelFilePath, pomanager.globalObjects.productstestdata)

    //get the test data and add to cart
    for (const data of testdata as Array<{ ProductName: string, Quantity: string }>) {
        //move to product detail page
        await pomanager.commonUtility.moveToProductDetailsSections(page, data.ProductName);
        //add to cart
        await pomanager.commonUtility.addToCart(page, data.Quantity.toString())

        //PopUp
        await expect(pomanager.productDetailsPage.modelPopup).toBeVisible();
        await expect(pomanager.productDetailsPage.productAddedMessage).toBeVisible();
        await pomanager.productDetailsPage.continueShoppingFromModal();

        //move to products page
        await pomanager.header.goToProductsPage();
    }

    //move to cart 
    await pomanager.header.goToCartPage();

    //
});