import { Page, Locator, expect  } from "@playwright/test";

export class LoginSignupPage {
    constructor(private readonly page: Page) {}

    readonly loginEmail = this.page.locator("//input[@data-qa='login-email']");
    readonly loginPassword = this.page.locator("//input[@data-qa='login-password']");
    readonly loginButton = this.page.getByRole('button', { name: 'Login' });
    readonly loginError = this.page.getByText('Your email or password is incorrect!', { exact: true });
    readonly signupName = this.page.locator("//input[@data-qa='signup-name']");
    readonly signupEmail = this.page.locator("//input[@data-qa='signup-email']");
    readonly signupButtom = this.page.getByRole('button', { name: 'Signup' })
    readonly signupError = this.page.getByText('Email Address already exist!', { exact: true })

    async userLogin(email: string, password: string) {
        await this.loginEmail.fill(email);
        await this.loginPassword.fill(password);
        await this.loginButton.click();
    }

    async userSignup(name:string, email:string){
        await this.signupName.fill(name);
        await this.signupEmail.fill(email);
        await this.signupButtom.click();
    }
}