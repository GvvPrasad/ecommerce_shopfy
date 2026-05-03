import { Page } from "@playwright/test";
import { ENV_CONFIG } from '../config/config.env'

export class paymentPage{

    constructor (private readonly page:Page){}

    readonly cardName = this.page.locator('input[name="name_on_card"]');
    readonly cardNumber = this.page.locator('input[name="card_number"]');
    readonly cvc = this.page.locator('input[name="cvc"]');
    readonly expirationMonth = this.page.locator('input[name="expiry_month"]');
    readonly expirationYear =  this.page.locator('input[name="expiry_year"]');
    readonly makePayment = this.page.getByRole('button', { name: 'Pay and Confirm Order' });


    async complatePayment(){
        await this.cardName.fill(ENV_CONFIG.userCName);
        await this.cardNumber.fill(ENV_CONFIG.userCNumber);
        await this.cvc.fill(ENV_CONFIG.userCcvc);
        await this.expirationMonth.fill(ENV_CONFIG.userCexpmonth);
        await this.expirationYear.fill(ENV_CONFIG.userCexpyear);
        await this.makePayment.click();
    }

    
}


