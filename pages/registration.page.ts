import { Page, Locator, expect } from "@playwright/test";

export class RegistrationPage {

     constructor(private readonly page: Page) {}

     readonly mr = this.page.getByRole('radio', { name: 'Mr.' });
     readonly mrs = this.page.getByRole('radio', { name: 'Mrs.' });
     readonly userName = this.page.locator('#name');
     readonly userEmail = this.page.locator('#email');
     readonly userPassword = this.page.locator('#password');
     readonly dobDays = this.page.locator('#days');
     readonly dobMonths = this.page.locator('#months');
     readonly dobYears = this.page.locator('#years');
     readonly newsLetterCheckBox = this.page.getByLabel('Sign up for our newsletter!');
     readonly specialOffersCheckBox = this.page.getByLabel('Receive special offers from our partners!');
     readonly firstName = this.page.getByLabel('First name ');
     readonly lastName = this.page.getByLabel('Last name ');
     readonly address1 = this.page.locator('#address1');
     readonly address2 = this.page.locator('#address2');
     readonly country = this.page.locator('#country');
     readonly state = this.page.getByLabel('State ');
     readonly city = this.page.getByLabel('City ');
     readonly zipCode = this.page.locator('#zipcode');
     readonly mobileNumber = this.page.getByLabel('Mobile Number ');
     readonly createAccount = this.page.getByRole('button', { name: 'Create Account' });
     readonly successMessage = this.page.locator('//h2[@data-qa="account-created"]');
     readonly continue = this.page.getByRole('link', { name: 'Continue' });


     async selectGender(gender: string) {
          if (gender.toLocaleLowerCase() === 'male') {
               await this.mr.click();
          }
          else {
               await this.mr.click();
          }
     }

     async enterUserPassword(password?: string) {
          if (password !== undefined) {
               await this.userPassword.fill(password);
          }
     }

     async dateOfBirth(day: number, month: string, year: number) {
          await this.dobDays.selectOption({ value: day.toString() });
          await this.dobMonths.selectOption(month);
          await this.dobYears.selectOption({ value: year.toString() });
     }

     async userFullName(fname?: string, lname?: string) {
          if (fname !== undefined) {
               await this.firstName.fill(fname);
          }
          if (lname !== undefined) {
               await this.lastName.fill(lname);
          }
     }

     async fullAddress(address1: string, address2: string, state?: string, city?: string, zipcode?: number, mobile?: number) {
          await this.address1.fill(address1);
          await this.address2.fill(address2);

          if (state !== undefined) {
               await this.state.fill(state);
          }

          if (city !== undefined) {
               await this.city.fill(city);
          }

          if (zipcode !== undefined) {
               await this.zipCode.fill(`${zipcode}`);
          }

          if (mobile !== undefined) {
               await this.mobileNumber.fill(`${mobile}`);
          }
     }

     async accountCreation() {
          await this.createAccount.click();
     }

     async continueToHome() {
          await this.continue.click();
     }

}