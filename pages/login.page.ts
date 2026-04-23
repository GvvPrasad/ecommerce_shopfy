import { Page, Locator, expect  } from "@playwright/test";

export class LoginPage {
    constructor(private readonly page: Page) {}

    readonly loginEmail = this.page.locator("//input[@data-qa='login-email']");
    readonly loginPassword = this.page.locator("//input[@data-qa='login-password']");
    readonly loginButton = this.page.getByRole('button', { name: 'Login' });
    readonly loginError = this.page.getByText('Your email or password is incorrect!');

    async userLogin(email: string, password: string) {
        await this.loginEmail.fill(email);
        await this.loginPassword.fill(password);
        await this.loginButton.click();
    }
}