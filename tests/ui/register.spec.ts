import { test, expect } from '../../fixtures/baseFixture';
import { readExcel } from '../../utils/excel.Util';
import { gobleObject } from '../../objectrespo/gobleObjects';

const gobleobjects = new gobleObject();
const testdata = readExcel(gobleobjects.excelFilePath, gobleobjects.register) as any[];

testdata.forEach((data: any, index: number) => {

  test(`${data.Name} user creation`, async ({ page, pomanager }) => {

    //skip the test execution if Run type is no
    test.skip((data.Run).toString().toLowerCase() === 'no');

    await pomanager.homepage.lanchApp();
    await pomanager.header.goToLogin();
    await pomanager.signuppage.userSignUp(data.Name, data.Email);
    await expect(page).toHaveURL('/signup');

    //existing email error
    if (await pomanager.signuppage.emailExist.isVisible()) {
      await expect(pomanager.signuppage.emailExist).toHaveText('Email Address already exist!');
      // End test here (mark as pass since expected error is shown)
      return;
    };

    await pomanager.registerpage.selectGender(data.Gender);
    await expect(pomanager.registerpage.name).toHaveValue(data.Name);
    await expect(pomanager.registerpage.email).toHaveValue(data.Email);
    await pomanager.registerpage.userPassword(data.Password);
    await pomanager.registerpage.dateOfBirth(data.Day, data.Month, data.Year);
    await pomanager.registerpage.fullName(data.FirstName, data.LastName);
    await pomanager.registerpage.fullAddress(data.Address, data.Address2, data.State, data.City, data.Zipcode, data.Mobile);
    await pomanager.registerpage.accountCreation();

    //check user should be created or not
    if ((data.Case).toString().toLowerCase() === "Positive") {
      await expect(pomanager.registerpage.successMessage).toBeVisible();
      await pomanager.registerpage.continueToHome();
      await pomanager.header.logOut();
    } else {
      await expect(pomanager.registerpage.successMessage).not.toBeVisible();
    }

  });
});