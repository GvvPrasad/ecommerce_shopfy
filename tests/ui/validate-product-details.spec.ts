import { test, expect } from '../../fixtures/base.fixture';


test('Validate product details between Home & details page', async ({ page, pomanager }) => {

    await page.goto('/')
    await pomanager.header.goToProductsPage();

    //move to product detail page
    let desiredProductPrice = await pomanager.commonUtility.moveToProductDetailsSections(page, pomanager.globalObjects.desiredProduct);

    //product details page
    await expect(page.url()).toContain('product_details');
    await expect(pomanager.productDetailsPage.productName).toHaveText(pomanager.globalObjects.desiredProduct);
    await expect(pomanager.productDetailsPage.productPrice).toHaveText(desiredProductPrice!);
});

