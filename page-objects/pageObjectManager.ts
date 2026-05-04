import { Page } from '@playwright/test';
import { GlobalObject } from '../page-objects/globalObjects';
import { Header } from '../pages/header.page';
import { SignUpPage } from '../pages/sign-up.page';
import { RegisterPage } from '../pages/register.page';
import { LoginPage } from '../pages/login.page';
import { HomePage } from '../pages/home.page';
import { ProductDetailsPage } from '../pages/product-detail.page';
import { Helper } from '../utils/helper.util';
import { CartPage } from '../pages/cart.page';
import { CheckOutPage } from '../pages/checkout.page';
import { paymentPage } from '../pages/payment.page'
import { PaymentConfirmationPage } from '../pages/payment-confirmation.page'
import { apiDashboardPage } from '../pages/api-dashboard.page'

export class PageObjectManager {

    constructor(private readonly page: Page) { }

    readonly header = new Header(this.page);
    readonly signUpPage = new SignUpPage(this.page);
    readonly globalObjects = new GlobalObject();
    readonly registerPage = new RegisterPage(this.page);
    readonly loginPage = new LoginPage(this.page);
    readonly homePage = new HomePage(this.page);
    readonly productDetailsPage = new ProductDetailsPage(this.page); 
    readonly helper = new Helper();
    readonly cartPage = new CartPage(this.page);
    readonly checkoutpage = new CheckOutPage(this.page);
    readonly payementpage = new paymentPage(this.page);
    readonly paymentconfirmation = new PaymentConfirmationPage(this.page);
    readonly apidashboardpage = new apiDashboardPage(this.page);
    
}