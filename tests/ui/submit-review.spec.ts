import { test, expect } from '../../fixtures/base.fixture';
import { readExcel } from '../../utils/excel.utils';
import { GlobalObjects } from '../../objects-respo/global-or';

const globalObjects = new GlobalObjects();
const testdata = readExcel(globalObjects.excelFilePath, globalObjects.reviewTestdata) as any[];


testdata.forEach((data: any, index: number) => {

    test(`Review for ${data.ProductName}`, async ({ page, pomanager }) => {
        await page.goto('/')
        await pomanager.header.goToProductsPage()

        //navigative to product details page
        await pomanager.commonUtility.moveToProductDetailsSections(page, data.ProductName);

        //Enter review
        await pomanager.productDetailsPage.enterReview(data.Name, data.Email, data.Comments);
        await pomanager.productDetailsPage.reviewContainer.screenshot({path: `screenshot/reviews_entered_${data.ProductName}.png`})
       
        //submit review
        await pomanager.productDetailsPage.submitReview();

        //validaet success message
        await expect(pomanager.productDetailsPage.reviewSuccessMessage).toBeVisible();
        await expect(pomanager.productDetailsPage.reviewSuccessMessage).toHaveText('Thank you for your review.')
        await pomanager.productDetailsPage.reviewSuccessMessage.screenshot({ path: `screenshot/${data.ProductName}.png`})
    })
})


