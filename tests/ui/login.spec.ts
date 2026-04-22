import { test, expect } from '../../fixtures/baseFixture';
import { readExcel } from '../../utils/excel.Util';
import { gobleObject } from '../../objectrespo/gobleObjects';

const gobleobjects = new gobleObject();
const testdata = readExcel(gobleobjects.excelFilePath, gobleobjects.login) as any[];

testdata.forEach((data: any, index: number) => {

  test(`login test ${data.Name}`, async ({ page, pomanager }) => {

    //skip the test execution if case type is no
    test.skip((data.Run).toString().toLowerCase() === 'no');

    await pomanager.header.lanchApp();
    await pomanager.header.goToLogin();
    await pomanager.loginpage.userLogin(data.Email, data.Password);

    // Assuming positive case: check if logged in, perhaps by checking logout button visible
    if ((data.Case).toString().toLowerCase() === "positive") {
      await expect(pomanager.header.logout).toBeVisible();
      await pomanager.header.logOut;
    } else {
      await expect(pomanager.loginpage.loginError).toBeVisible();
    }
  });
});