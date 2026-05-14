import { Page } from "@playwright/test";
import { ENV_CONFIG } from '../config/config.env'

export class paymentPage{

    constructor (private readonly page:Page){}

    readonly cardName = this.page.locator('input[name="name_on_card"]');
    readonly cardNumber = this.page.locator('input[name="card_number"]');
    readonly cvc = this.page.locator('input[name="cvc"]');
    readonly expirationMonth = this.page.locator('input[name="expiry_month"]');
    readonly expirationYear =  this.page.locator('input[name="expiry_year"]');
    readonly submitCardDetail = this.page.getByRole('button', { name: 'Pay and Confirm Order' });
    readonly orderplacedMessage = this.page.getByText('Your order has been placed successfully!', { exact: true })


    async makePayment(){
        await this.cardName.fill(ENV_CONFIG.User_Cname);
        await this.cardNumber.fill(ENV_CONFIG.User_Cnumber);
        await this.cvc.fill(ENV_CONFIG.User_Ccvc);
        await this.expirationMonth.fill(ENV_CONFIG.User_Cexpmonth);
        await this.expirationYear.fill(ENV_CONFIG.User_Cexpyear);
        await this.submitCardDetail.click();
    }

    
}


