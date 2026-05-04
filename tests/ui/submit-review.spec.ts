import { test, expect } from '../../fixtures/baseFixture';


test('write a product review', async ({ page, pomanager }) => {

    await pomanager.homePage.launchApp();

    //navigative to product details page
    let desiredProductPrice = await pomanager.helper.moveToProductDetails(page, pomanager.globalObjects.desiredProduct);

    //submit the review
    await pomanager.productDetailsPage.submitReview('prasad', 'prasad@yopmail.com', 'good');

    //validaet success message
    await expect(pomanager.productDetailsPage.successMessage).toBeVisible();
    await expect(pomanager.productDetailsPage.successMessage).toHaveText('Thank you for your review.')
    await pomanager.productDetailsPage.successMessage.screenshot({path:'success.png'})
});