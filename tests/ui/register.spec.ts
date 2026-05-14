import { test, expect } from '../../fixtures/baseFixture';
import { readExcel } from '../../utils/excel.util';
import { GlobalObject } from '../../page-objects/globalObjects';

const globalObjects = new GlobalObject();
const testdata = readExcel(globalObjects.excelFilePath, globalObjects.register) as any[];

testdata.forEach((data: any, index: number) => {

  test(`${data.Name} user creation`, async ({ page, pomanager }) => {

    //skip the test execution if Run type is no
    test.skip((data.Run).toString().toLowerCase() === 'no');

    await page.goto('/')
    await pomanager.header.goToLoginAndSignUpScreen();
    await pomanager.loginSignup.userSignup(data.Name, data.Email);

    //existing email error
    if (await pomanager.loginSignup.signupError.isVisible()) {
      // End test here (mark as pass since expected error is shown)
      return;
    } else {
      await expect(page).toHaveURL('/signup');
    };

    await pomanager.registration.selectGender(data.Gender);
    await expect(pomanager.registration.name).toHaveValue(data.Name);
    await expect(pomanager.registration.email).toHaveValue(data.Email);
    await pomanager.registration.userPassword(data.Password);
    await pomanager.registration.dateOfBirth(data.Day, data.Month, data.Year);
    await pomanager.registration.fullName(data.FirstName, data.LastName);
    await pomanager.registration.fullAddress(data.Address, data.Address2, data.State, data.City, data.Zipcode, data.Mobile);
    await pomanager.registration.accountCreation();

    //check user should be created or not
    if ((data.Case).toString().toLowerCase() === "Positive") {
      await expect(pomanager.registration.successMessage).toBeVisible();
      await pomanager.registration.continueToHome();
      await pomanager.header.logOut();
    } else {
      await expect(pomanager.registration.successMessage).not.toBeVisible();
    }

  });
});