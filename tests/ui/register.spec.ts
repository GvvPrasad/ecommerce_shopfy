import { test, expect } from '../../fixtures/base.fixture';
import { ExcelUtility } from '../../utils/excel.utils';
import { GlobalObjects } from '../../objects-respo/global-or';

const globalObjects = new GlobalObjects();
const excelUtility = new ExcelUtility();

(async () => {
  const testdata = await excelUtility.readExcel(globalObjects.excelFilePath, globalObjects.registratioTestData) as any[];

testdata.forEach((data: any, index: number) => {

  test(`${data.Name} user creation`, async ({ page, pomanager }) => {

    //skip the test execution if Run type is no
    test.skip((data.Run).toString().toLowerCase() === 'no');

    await page.goto('/')
    await pomanager.header.goToLoginSignUpPage()
    await pomanager.loginSignup.userSignup(data.Name, data.Email);

    //existing email error
    if (await pomanager.loginSignup.signupError.isVisible()) {
      // End test here (mark as pass since expected error is shown)
      return;
    } else {
      await expect(page).toHaveURL('/signup');
    };

    await pomanager.registration.selectGender(data.Gender);
    await expect(pomanager.registration.userName).toHaveValue(data.Name);
    await expect(pomanager.registration.userEmail).toHaveValue(data.Email);
    await pomanager.registration.enterUserPassword(data.Password);
    await pomanager.registration.dateOfBirth(data.Day, data.Month, data.Year);
    await pomanager.registration.userFullName(data.FirstName, data.LastName);
    await pomanager.registration.fullAddress(data.Address, data.Address2, data.State, data.City, data.Zipcode, data.Mobile);
    await pomanager.registration.accountCreation();


    //check user should be created or not
    if ((data.Case).toString().toLowerCase() === "positive") {
      await expect(pomanager.registration.successMessage).toBeVisible();
      await pomanager.registration.continueToHome();
      await expect(pomanager.header.logout).toBeVisible();
      await pomanager.header.logOut();
    } else {
      await expect(pomanager.registration.successMessage).not.toBeVisible();
    }

  });
});