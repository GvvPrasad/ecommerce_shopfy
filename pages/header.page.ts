import { Page } from "@playwright/test";

export class Header{
    constructor (private readonly page: Page){}

    readonly home = this.page.getByRole('link',{name:' Home'});
    readonly products = this.page.getByRole('link',{name:' Products'});
    readonly cart = this.page.getByRole('link',{name:' Cart'});
    readonly login = this.page.getByRole('link',{name:' Signup / Login'});
    readonly contactus = this.page.getByRole('link',{name:' Contact us'});
    readonly logout = this.page.getByRole('link',{name:' Logout'});

    async goToHome(){
        await this.home.click();
    }

    async goToProducts(){
        await this.products.click();
    }

    async goToCart(){
        await this.cart.click();
    }

    async goToLogin(){
        await this.login.click();
    }

    async goToContactus(){
        await this.contactus.click();
    }

    async logOut(){
        await this.logout.click();
    }
}