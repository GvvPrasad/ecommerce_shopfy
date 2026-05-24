import { Page } from '@playwright/test';
import { GlobalObjects } from '../objects-respo/global-or';
import { CommonUtility } from '../utils/common-functions.util';
import { ApiUtility } from '../utils/api.utils'
import { ExcelUtility } from '../utils/excel.utils'

import { HeaderSection } from '../pages/header-section.page';
import { LoginSignupPage } from '../pages/login-signup.page';
import { RegistrationPage } from '../pages/registration.page'
import { ProductsPage } from '../pages/products.page';
import { ProductDetailsPage } from '../pages/product-details.page';
import { CartPage } from '../pages/cart.page';
import { CheckOutPage } from '../pages/checkout.page';
import { PaymentPage } from '../pages/payment.page'
import { OrderConfirmationPage } from '../pages/order-confirmation.page'


export class PageObjectManager {

    constructor(private readonly page: Page) { }

    readonly globalObjects = new GlobalObjects();
    readonly commonUtility = new CommonUtility();
    readonly apiUtility = new ApiUtility();
    readonly excelUtility = new ExcelUtility();

    readonly header = new HeaderSection(this.page);
    readonly loginSignup = new LoginSignupPage(this.page);
    readonly registration = new RegistrationPage(this.page);
    readonly products = new ProductsPage(this.page);
    readonly productDetailsPage = new ProductDetailsPage(this.page);
    readonly cartPage = new CartPage(this.page);
    readonly checkoutpage = new CheckOutPage(this.page);
    readonly payment = new PaymentPage(this.page);
    readonly orderConfirmation = new OrderConfirmationPage(this.page);
    


}