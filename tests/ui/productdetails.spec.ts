import { test, expect } from '../../fixtures/baseFixture';
import { poManger } from '../../objectrespo/pomanager';

    //variables
    const desiredProduct = 'Summer White Top';
    let desiredProductPrice:string;

    test('Vaiidate product details between Home & details page', async ({ page, pomanager }) => {

        await pomanager.homepage.lanchApp();

        const productcount = await pomanager.homepage.featureProductItems.count();

        //loop through all the products & select single product
        for(let i=0; i<productcount;i++){
            const productName = await pomanager.homepage.dressName.nth(i).innerText();
            if (productName===desiredProduct) {
                desiredProductPrice = await pomanager.homepage.dressPrice.nth(i).innerText();
                await pomanager.homepage.viewProduct.nth(i).click();
                break;
            }            
        }

        //product details page
        await expect(page.url()).toContain('product_details');
        await expect(pomanager.productdetailspage.productName).toHaveText(desiredProduct);
        await expect(pomanager.productdetailspage.productCategory).toHaveText('Category: Women > Tops');
        await expect(pomanager.productdetailspage.productPrice).toHaveText(desiredProductPrice);
    });
 
