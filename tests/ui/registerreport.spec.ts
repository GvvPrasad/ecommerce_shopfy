import { test, expect } from '../../fixtures/baseFixture';
import { readExcel } from '../../utils/excel.Util';
import { getEmptyFieldLocators } from '../../utils/validation.Util';
import { gobleObject } from '../../objectrespo/gobleObjects';

const gobleobjects = new gobleObject();
const testdata = readExcel(gobleobjects.excelFilePath, gobleobjects.loginsheet) as any[];

testdata.forEach((data: any, index: number) => {
  test(`${data.Name} user creation`, async ({ page, pomanager }) => {
    await pomanager.header.lanchApp();
    await pomanager.header.goToLogin();
    await pomanager.signuppage.userSignUp(data.Name, data.Email);
    await expect(page).toHaveURL('/signup');
    await pomanager.registerpage.selectGender(data.Gender);
    await expect(pomanager.registerpage.name).toHaveValue(data.Name);
    await expect(pomanager.registerpage.email).toHaveValue(data.Email);
    await pomanager.registerpage.userPassword(data.Password);
    await pomanager.registerpage.dateOfBirth(data.Day, data.Month, data.Year);
    await pomanager.registerpage.fullName(data.FirstName, data.LastName);
    await pomanager.registerpage.fullAddress(data.Address, data.Address2, data.State, data.City, data.Zipcode, data.Mobile);
    await pomanager.registerpage.accountCreation();
   
    if (data.Case === "valid") {
      await expect(pomanager.registerpage.successMessage).toBeVisible();
      await pomanager.registerpage.continueToHome();
      await pomanager.header.logOut();
    } else {
      await expect(pomanager.registerpage.successMessage).not.toBeVisible();
    }

  });
});