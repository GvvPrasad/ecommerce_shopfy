import { test as base, expect, Page, request } from '@playwright/test';
import { PageObjectManager } from '../page-objects/pageObjectManager';

type MyFixture = {
  pomanager: PageObjectManager;
  page: Page;
}

export const test = base.extend<MyFixture>({
  
  //page object manager
  pomanager: async ({ page }, use) => {
    const pomanager = new PageObjectManager(page)
<<<<<<< HEAD
    await pomanager.homePage.launchApp();
=======
>>>>>>> gvv
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

export { expect, request } from '@playwright/test';