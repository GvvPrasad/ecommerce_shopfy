import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/home.page';

test('navigative to login page', async ({ page }) => {
  const homepage = new HomePage(page);

  await homepage.goToHomePage();
  await homepage.goToLoginPage();
  await expect(page).toHaveURL('/login');

});