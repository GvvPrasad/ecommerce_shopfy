import { test, expect } from '../../fixtures/baseFixture';


<<<<<<< HEAD


test('Add to cart', async ({ page, pomanager }) => {

    //move to product detail page
    let desiredProductPrice = await pomanager.helper.moveToProductDetails(page, pomanager.globalObjects.desiredProduct);

    //add to cart
    await pomanager.productDetailsPage.enterQuantity('2'); 
    await pomanager.productDetailsPage.clickAddToCart();
=======
test('Add to cart', async ({ page, pomanager }) => {

    await pomanager.homePage.launchApp();

    //move to product detail page
    let desiredProductPrice = await pomanager.helper.moveToProductDetails(page, pomanager.globalObjects.desiredProduct);

    await pomanager.helper.addToCart(page, '3')
>>>>>>> gvv

    //PopUp
    await pomanager.productDetailsPage.popup.isVisible();
    await expect(pomanager.productDetailsPage.confirmMessage).toBeVisible();
<<<<<<< HEAD
    await pomanager.productDetailsPage.viewCartFromModal();
    await expect(page.url()).toContain('view_cart')

    //validate in cart page
    await expect(pomanager.cartPage.productName).toHaveText(pomanager.globalObjects.desiredProduct)
    await expect(pomanager.cartPage.productPrice).toHaveText(desiredProductPrice!);
    await expect(pomanager.cartPage.productQuantity).toHaveText('2');

    //Displaying total product value
    const totalPriceText = await pomanager.cartPage.totalCost.innerText();
    const totalPrice = parseFloat(totalPriceText.replace(/[^0-9.]/g, ""));

    //calculate total cost of products
    async function totalProductValue() {
        const rawPrice = await pomanager.cartPage.productPrice.innerText();
        const price = parseFloat(rawPrice.replace(/[^0-9.]/g, ""));
        const quantityText = await pomanager.cartPage.productQuantity.innerText();
        const quantity = Number(quantityText);
        return price * quantity;
    }

    const totalCost = await totalProductValue();

    await expect(totalPrice).toBe(totalCost)

});

=======
});
>>>>>>> gvv
