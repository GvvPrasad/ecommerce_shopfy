import { Page, Locator } from "@playwright/test";

export class SignUpPage {
    
    constructor(private readonly page: Page) {}

    readonly userName = this.page.getByPlaceholder('Name')
    readonly userEmail = this.page.locator("//input[@data-qa='signup-email']");
    readonly signUp = this.page.getByRole('button',{name:'Signup'});
    readonly emailExist = this.page.getByText('Email Address already exist!')

    async userSignUp(username:string, useremail:string){
        await this.userName.fill(username);
        await this.userEmail.fill(useremail);
        await this.signUp.click();
    }

}