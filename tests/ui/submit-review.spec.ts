import { test, expect } from '../../fixtures/baseFixture';


test('write a product review', async ({ page, pomanager }) => {

    let desiredProductPrice = await pomanager.helper.moveToProductDetails(page, pomanager.globalObjects.desiredProduct);

    await pomanager.productDetailsPage.submitReview('prasad', 'prasad@yopmail.com', 'good');

    await expect(pomanager.productDetailsPage.successMessage).toHaveText('Thank you for your review.')
});