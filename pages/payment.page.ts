import { Page } from "@playwright/test";
import { ENV_CONFIG } from '../config/config.env'

export class PaymentPage{

    constructor (private readonly page:Page){}

    readonly cardName = this.page.locator('input[name="name_on_card"]');
    readonly cardNumber = this.page.locator('input[name="card_number"]');
    readonly cvcNumber = this.page.locator('input[name="cvc"]');
    readonly expirationMonth = this.page.locator('input[name="expiry_month"]');
    readonly expirationYear =  this.page.locator('input[name="expiry_year"]');
    readonly submitCardDetail = this.page.getByRole('button', { name: 'Pay and Confirm Order' });
    readonly orderplacedSuccessMessage = this.page.getByText('Your order has been placed successfully!', { exact: true })


    async makePayment(){
        await this.cardName.fill(ENV_CONFIG.CARD_NAME);
        await this.cardNumber.fill(ENV_CONFIG.CARD_NUMBER);
        await this.cvcNumber.fill(ENV_CONFIG.CARD_CVC);
        await this.expirationMonth.fill(ENV_CONFIG.CARD_EXP_MONTH);
        await this.expirationYear.fill(ENV_CONFIG.CARD_EXP_YEAR);
        await this.submitCardDetail.click();
    }

    
}


