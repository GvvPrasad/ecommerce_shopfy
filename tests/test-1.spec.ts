await page.goto('https://automationexercise.com/product_details/6');
await expect(page.locator('section')).toContainText('Rs. 400');
await page.getByText('Home  Products Cart Signup').click();
await page.getByRole('link', { name: ' Home' }).click();