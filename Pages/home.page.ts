import { Page, Locator } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly login: Locator;

    constructor(page: Page) {
        this.page = page;
        this.login = page.getByRole('link', { name: ' Signup / Login' })
    }

    async goToHomePage() {
        await this.page.goto('/');
    }

    async goToLoginPage() {
        await this.login.click();
    }

}