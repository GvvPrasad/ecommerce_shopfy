import { Page } from '@playwright/test';
import { GlobalObject } from '../page-objects/globalObjects';
import { Helper } from '../utils/helper.util';

import { Header } from '../pages/header.page';
import { LoginSignupPage } from '../pages/login-signup.page';
import { RegistrationPage } from '../pages/register.page'
import { ProductPage } from '../pages/product.page';
import { ProductDetailsPage } from '../pages/product-detail.page';
import { CartPage } from '../pages/cart.page';
import { CheckOutPage } from '../pages/checkout.page';
import { paymentPage } from '../pages/payment.page'
import { OrderConfirmationPage } from '../pages/order-confirmation.page'
import { apiDashboardPage } from '../pages/api-dashboard.page';

export class PageObjectManager {

    constructor(private readonly page: Page) { }

    readonly globalObjects = new GlobalObject();
    readonly helper = new Helper();

    readonly header = new Header(this.page);
    readonly loginSignup = new LoginSignupPage(this.page);
    readonly registration = new RegistrationPage(this.page);
    readonly products = new ProductPage(this.page);
    readonly productDetailsPage = new ProductDetailsPage(this.page);
    readonly cartPage = new CartPage(this.page);
    readonly checkoutpage = new CheckOutPage(this.page);
    readonly payment = new paymentPage(this.page);
    readonly orderConfirmation = new OrderConfirmationPage(this.page);
    readonly apidashboardpage = new apiDashboardPage(this.page);

}