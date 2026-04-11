import { test, expect } from '@playwright/test';
import { poManger } from '../../objectrespo/pomanager';
import { readExcel } from '../../utils/excelUtil';



test('navigative to login page', async ({ page }) => {

  // Initialize page objects
  const pomanager = new poManger(page);

  //get data from excel
  const testdata = readExcel(pomanager.gobleobjects.excelFilePath, pomanager.gobleobjects.loginsheet);

  //
  for(const data of testdata as any[]){
    await pomanager.header.lanchApp();
    await pomanager.header.goToLogin();

    await pomanager.signuppage.userSignUp(data.Name, data.Email);

    await expect(page).toHaveURL('/signup')

    await pomanager.registerpage.selectGender(data.Gender);

    await expect(pomanager.registerpage.name).toHaveValue(data.Name)
    await expect(pomanager.registerpage.email).toHaveValue(data.Email)

    await pomanager.registerpage.userPassword(data.Password);

    await pomanager.registerpage.dateOfBirth(data.Day,data.Month,data.Year);

    await pomanager.registerpage.fullName(data.FirstName,data.LastName);

    await pomanager.registerpage.fullAddress(data.Address,data.Address2,data.State,data.City,data.Zipcode,data.Mobile);

    await pomanager.registerpage.accountCreation();

    await expect(pomanager.registerpage.successMessage).toBeVisible();
  }


  

  

 


});