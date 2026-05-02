import { test, expect } from '../../fixtures/baseFixture';


test('Validate product details between Home & details page', async ({ page, pomanager }) => {

    await pomanager.homePage.launchApp();

    //move to product detail page
    let desiredProductPrice = await pomanager.helper.moveToProductDetails(page, pomanager.globalObjects.desiredProduct);
>>>>>>> gvv

    //product details page
    await expect(page.url()).toContain('product_details');
    await expect(pomanager.productDetailsPage.productName).toHaveText(pomanager.globalObjects.desiredProduct);
    await expect(pomanager.productDetailsPage.productCategory).toContainText('Category: Women');
    await expect(pomanager.productDetailsPage.productPrice).toHaveText(desiredProductPrice!);
});

