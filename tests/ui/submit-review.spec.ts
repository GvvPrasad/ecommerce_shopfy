import { test, expect } from '../../fixtures/base.fixture';


test('write a product review', async ({ page, pomanager }) => {

    await page.goto('/')
    await pomanager.header.goToProductsPage()

    //navigative to product details page
    let desiredProductPrice = await pomanager.commonUtility.moveToProductDetailsSections(page, pomanager.globalObjects.desiredProduct);

    //submit the review
    await pomanager.productDetailsPage.submitReview('prasad', 'prasad@yopmail.com', 'good');

    //validaet success message
    await expect(pomanager.productDetailsPage.reviewSuccessMessage).toBeVisible();
    await expect(pomanager.productDetailsPage.reviewSuccessMessage).toHaveText('Thank you for your review.')
    await pomanager.productDetailsPage.reviewSuccessMessage.screenshot({path:'screenshots/success.png'})
});