import { Page, Locator } from "@playwright/test";

export class registerPage {
     constructor(private readonly page: Page) { }

     readonly mr = this.page.getByRole('radio', { name: 'Mr.' });
     readonly mrs = this.page.getByRole('radio', { name: 'Mrs.' });
     readonly name = this.page.locator('#name');
     readonly email = this.page.locator('#email');
     readonly password = this.page.locator('#password');
     readonly days = this.page.locator('#days');
     readonly months = this.page.locator('#months');
     readonly years = this.page.locator('#years');
     readonly newsletter = this.page.getByLabel('Sign up for our newsletter!');
     readonly specialoffers = this.page.getByLabel('Receive special offers from our partners!');
     readonly firstName = this.page.getByLabel('First name ');
     readonly lastName = this.page.getByLabel('Last name ');
     readonly address = this.page.locator('#address1');
     readonly address2 = this.page.locator('#address2');
     readonly state = this.page.getByLabel('State ');
     readonly city = this.page.getByLabel('City ');
     readonly zipcode = this.page.locator('#zipcode');
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

     async userPassword(password:string){
          await this.password.fill(password)
     }

     async dateOfBirth(day:number, month:string, year: number){
          await this.days.selectOption({ value: day.toString() });
          await this.months.selectOption(month);
          await this.years.selectOption({ value: year.toString() });
     }

     async fullName(fname: string, lname:string){
          await this.firstName.fill(fname);
          await this.lastName.fill(lname)
     }

     async fullAddress(address1: string, address2: string, state:string, city:string, zipcode: number, mobile:number){
          await this.address.fill(address1);
          await this.address2.fill(address2);
          await this.state.fill(state);
          await this.city.fill(city);
          await this.zipcode.fill(`${zipcode}`);
          await this.mobileNumber.fill(`${mobile}`);
     }

     async accountCreation(){
          await this.createAccount.click()
     }

}