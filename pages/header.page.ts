import { Page } from "@playwright/test";

export class Header{
    constructor (private readonly page: Page){}

    readonly home = this.page.getByRole('link',{name:' Home'});
    readonly products = this.page.getByRole('link',{name:' Products'});
    readonly cart = this.page.getByRole('link',{name:' Cart'});
    readonly loginsignup = this.page.getByRole('link',{name:' Signup / Login'});
    readonly contactus = this.page.getByRole('link',{name:' Contact us'});
    readonly logout = this.page.getByRole('link',{name:' Logout'});
    readonly deleteAccount = this.page.getByRole('link', { name: 'Delete Account' })
    readonly loggedInUser = this.page.getByText('Logged in as');

    async goToHomeScreen(){
        await this.home.click();
    }

    async goToProductsScreen(){
        await this.products.click();
    }

    async goToCartScreen(){
        await this.cart.click();
    }

    async goToLoginAndSignUpScreen(){
        await this.loginsignup.click();
    }

    async goToContactusScreen(){
        await this.contactus.click();
    }

    async logOut(){
        await this.logout.click();
    }

    async accountDelete(){
        await this.deleteAccount.click();
    }
}