import { test, expect } from '../../fixtures/baseFixture';


test('Add to cart', async ({ page, pomanager }) => {

    await pomanager.homePage.launchApp();

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

    //validate details in cart page
    await expect(pomanager.cartPage.productName).toHaveText(pomanager.globalObjects.desiredProduct)
    await expect(pomanager.cartPage.productPrice).toHaveText(desiredProductPrice!);
    await expect(pomanager.cartPage.productQuantity).toHaveText('3');

    //Displaying single product total cost
    const totalPriceText = await pomanager.cartPage.productTotalPrice.innerText();
    const totalPrice = Number(totalPriceText.replace("Rs.", "").replace(/,/g, "").trim());
    console.log("Total displaying price from cart page: " + totalPrice)

    //calculate single product total cost
    const totalCost = await pomanager.helper.totalProductValue(page);

    await expect(totalPrice).toBe(totalCost)

});
