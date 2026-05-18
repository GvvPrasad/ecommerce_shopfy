import { test, expect } from '../../fixtures/base.fixture';
import { ENV_CONFIG } from '../../config/config.env'
import * as fs from 'fs';


test('Add to cart', async ({ page, pomanager }) => {

    //lanch Application
    await page.goto('/')

    //login
    await pomanager.header.goToLoginSignUpPage();
    await pomanager.loginSignup.userLogin(ENV_CONFIG.USER_EMAIL, ENV_CONFIG.USER_PASSWORD);

    //move to product detail page
    let desiredProductPrice = await pomanager.commonUtility.moveToProductDetailsSections(page, pomanager.globalObjects.desiredProduct);

    //add to cart
    await pomanager.commonUtility.addToCart(page, '3')

    //PopUp
    await expect(pomanager.productDetailsPage.modelPopup).toBeVisible();
    await expect(pomanager.productDetailsPage.productAddedMessage).toBeVisible();

    //move to cart page
    await pomanager.productDetailsPage.cartfromModel();
    await expect(page.url()).toContain('view_cart')


    //Displaying single product total cost
    const totalPriceText = await pomanager.cartPage.productTotalPrice.innerText();
    const totalPrice = Number(totalPriceText.replace("Rs.", "").replace(/,/g, "").trim());

    //calculate single product total cost
    const totalCost = await pomanager.commonUtility.totalSingleProductValue(page);

    //validate total cost is as expected
    await expect(totalPrice).toBe(totalCost)

    //checkout
    await pomanager.cartPage.goToCheckOut();

    //check product is visiable
    await expect(pomanager.checkoutpage.checkOutProductsList).toBeVisible();
 
    //place order
    await pomanager.checkoutpage.placeTheOrder();

    //Fill the card details & make payment
    await pomanager.payment.makePayment();

    //validate succes message is displayed
    await expect(pomanager.orderConfirmation.orderConfirmationText).toBeVisible();
    await expect(pomanager.orderConfirmation.successMessage).toBeVisible();


    //Download Invoice
    //Wait for the download event while clicking the download button
    const [download] = await Promise.all([
        page.waitForEvent("download"), // listens for a download to start
        await pomanager.orderConfirmation.downloadInvoice(), // triggers the download
    ]);

    //Get the suggested filename
    const suggestedFileName = download.suggestedFilename();

    //Save the file to a specific path
    const filePath = `downloads/${suggestedFileName}`;
    await download.saveAs(filePath);

    // Validate file exists
    const fileExists = fs.existsSync(filePath);
    expect(fileExists).toBeTruthy();

});
