import { test, expect } from '../../fixtures/base.fixture';

test('Add to cart', async ({ page, pomanager }) => {

    await page.goto('/')
    await pomanager.header.goToProductsPage()

    //move to product detail page
    let desiredProductPrice = await pomanager.commonUtility.moveToProductDetailsSections(page, pomanager.globalObjects.desiredProduct);

    await pomanager.commonUtility.addToCart(page, '3')

    //PopUp
    await pomanager.productDetailsPage.modelPopup.isVisible();
    await expect(pomanager.productDetailsPage.productAddedMessage).toBeVisible();
});