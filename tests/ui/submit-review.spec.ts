import { test, expect } from '../../fixtures/baseFixture';


test('write a product review', async ({ page, pomanager }) => {

<<<<<<< HEAD
    //navigative to product details page
    let desiredProductPrice = await pomanager.helper.moveToProductDetails(page, pomanager.globalObjects.desiredProduct);

    //submit the review
    await pomanager.productDetailsPage.submitReview('prasad', 'prasad@yopmail.com', 'good');

    //validaet success message
=======
    let desiredProductPrice = await pomanager.helper.moveToProductDetails(page, pomanager.globalObjects.desiredProduct);

    await pomanager.productDetailsPage.submitReview('prasad', 'prasad@yopmail.com', 'good');

>>>>>>> 4604f5fb0f08c539169d28b02737b1037f655046
    await expect(pomanager.productDetailsPage.successMessage).toHaveText('Thank you for your review.')
});