import { test, expect } from '../../fixtures/baseFixture';
import { ENV_CONFIG } from '../../config/config.env'


test('Add to cart', async ({ page, pomanager }) => {

    //lanch Application
    await pomanager.homePage.launchApp();

    //login
    await pomanager.header.goToLogin();
    await pomanager.loginPage.userLogin(ENV_CONFIG.userSignInEmail, ENV_CONFIG.userSignInPassword);

    //move to product detail page
    let desiredProductPrice = await pomanager.helper.moveToProductDetails(page, pomanager.globalObjects.desiredProduct);

    //add to cart
    await pomanager.helper.addToCart(page, '3')

    //PopUp
    await pomanager.productDetailsPage.popup.isVisible();
    await expect(pomanager.productDetailsPage.confirmMessage).toBeVisible();

    //move to cart page
    await pomanager.productDetailsPage.viewCartFromModal();
    await expect(page.url()).toContain('view_cart')

    //validate product details in cart
    await pomanager.helper.validatePurchaseDetail(page, pomanager.globalObjects.desiredProduct, desiredProductPrice!, '3')

    //Displaying single product total cost
    const totalPriceText = await pomanager.cartPage.productTotalPrice.innerText();
    const totalPrice = Number(totalPriceText.replace("Rs.", "").replace(/,/g, "").trim());

    //calculate single product total cost
    const totalCost = await pomanager.helper.totalProductValue(page);

    //validate total cost is as expected
    await expect(totalPrice).toBe(totalCost)

    //checkout
    await pomanager.cartPage.goToCheckOut();

    //check product is visiable
    await expect(pomanager.checkoutpage.checkoutProducts).toBeVisible();
    await pomanager.helper.validatePurchaseDetail(page, pomanager.globalObjects.desiredProduct, desiredProductPrice!, '3')

    //place order
    await pomanager.checkoutpage.placeTheOrder();

    //Make payment
    await pomanager.payementpage.complatePayment();

    await expect(pomanager.paymentconfirmation.successmessage).toBeVisible();
    await expect(pomanager.paymentconfirmation.orderConfirmation).toBeVisible();

    //Download Invoice
    //Wait for the download event while clicking the download button
    const [download] = await Promise.all([
        page.waitForEvent("download"), // listens for a download to start
        await pomanager.paymentconfirmation.downloadInvoice(), // triggers the download
    ]);

    //Get the suggested filename
    const suggestedFileName = download.suggestedFilename();

    //Save the file to a specific path
    await download.saveAs(`downloads/${suggestedFileName}`);

});
