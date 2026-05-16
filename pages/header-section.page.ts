import { Page } from "@playwright/test";

export class HeaderSection{
    constructor (private readonly page: Page){}

    readonly homePage = this.page.getByRole('link',{name:' Home'});
    readonly productsPage = this.page.getByRole('link',{name:' Products'});
    readonly cartPage = this.page.getByRole('link',{name:' Cart'});
    readonly loginsignupPage = this.page.getByRole('link',{name:' Signup / Login'});
    readonly contactusPage = this.page.getByRole('link',{name:' Contact us'});
    readonly logout = this.page.getByRole('link',{name:' Logout'});
    readonly deleteAccount = this.page.getByRole('link', { name: 'Delete Account' })
    readonly loggedInUser = this.page.getByText('Logged in as');

    async goToHomepage(){
        await this.homePage.click();
    }

    async goToProductsPage(){
        await this.productsPage.click();
    }

    async goToCartPage(){
        await this.cartPage.click();
    }

    async goToLoginSignUpPage(){
        await this.loginsignupPage.click();
    }

    async goToContactusPage(){
        await this.contactusPage.click();
    }

    async logOut(){
        await this.logout.click();
    }

    async accountDelete(){
        await this.deleteAccount.click();
    }
}