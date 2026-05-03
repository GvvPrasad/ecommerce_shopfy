import { test, expect } from '../../fixtures/baseFixture';
import { readExcel } from '../../utils/excel.util';
import { GlobalObject } from '../../page-objects/globalObjects';

const globalObjects = new GlobalObject();
const testdata = readExcel(globalObjects.excelFilePath, globalObjects.login) as any[];

testdata.forEach((data: any, index: number) => {

  test(`login test ${data.Name}`, async ({ page, pomanager }) => {

    //skip the test execution if case type is no
    test.skip((data.Run).toString().toLowerCase() === 'no');

<<<<<<< HEAD
=======
    await pomanager.homePage.launchApp();
>>>>>>> gvv
    await pomanager.header.goToLogin();
    await pomanager.loginPage.userLogin(data.Email, data.Password);

    // Assuming positive case: check if logged in, perhaps by checking logout button visible
    if ((data.Case).toString().toLowerCase() === "positive") {
      await expect(pomanager.header.logout).toBeVisible();
      await pomanager.header.logOut;
    } else {
      await expect(pomanager.loginPage.loginError).toBeVisible();
    }
  });
});