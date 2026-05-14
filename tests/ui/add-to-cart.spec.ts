import { test, expect } from '../../fixtures/baseFixture';

test('Add to cart', async ({ page, pomanager }) => {

    await page.goto('/')
    await pomanager.header.goToProductsScreen();

    //move to product detail page
    let desiredProductPrice = await pomanager.helper.moveToProductDetails(page, pomanager.globalObjects.desiredProduct);

    await pomanager.helper.addToCart(page, '3')

    //PopUp
    await pomanager.productDetailsPage.popup.isVisible();
    await expect(pomanager.productDetailsPage.confirmMessage).toBeVisible();
});