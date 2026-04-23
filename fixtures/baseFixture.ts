import { test as base, expect, Page } from '@playwright/test';
import { poManger } from '../objectrespo/pomanager';

type MyFixture = {
  pomanager: poManger;
  page: Page;
}

export const test = base.extend<MyFixture>({
  
  //page object manager
  pomanager: async ({ page }, use) => {
    const pomanager = new poManger(page)
    await use(pomanager)
  },
  
  // block all third-party requests
  page: async({page}, use) => {
    await page.route('**/*', route => {
      const url = route.request().url();
      if (url.startsWith('https://automationexercise.com')) {
        route.continue();
      }else{
        route.abort();
      }
    });

    await use(page);
  },

});

export { expect } from '@playwright/test';