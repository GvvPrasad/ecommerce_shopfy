import { test as base } from '@playwright/test';
import { poManger } from '../objectrespo/pomanager';
import { applyAllureMetadata } from '../utils/allure/allureAutoMapper'
import { AllureUtils } from '../utils/allure/allureUtils';
import * as allure from 'allure-js-commons';


type MyFixture ={
    pomanager:poManger;
}

export const test = base.extend<MyFixture>({
    pomanager: async({page},use)=>{
        const pomanager = new poManger(page)
        await use(pomanager)
    },

    // ✅ Extend page fixture to inject Allure globally
  page: async ({ page }, use, testInfo) => {

    // 🔹 Apply auto-mapped metadata (Epic / Feature / Story / Tags)
    await applyAllureMetadata();

    // 🔹 Add dynamic environment details
    await AllureUtils.addEnvironmentDetails();

    // 🔹 Add browser dynamically
    await allure.label('browser', testInfo.project.name);

    // 🔹 Execute actual test
    await use(page);

    // 🔹 Attach screenshot on failure
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshot = await page.screenshot();
      await allure.attachment('Failure Screenshot', screenshot, 'image/png');
    }
  }
});

export { expect } from '@playwright/test';