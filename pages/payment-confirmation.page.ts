import { Page } from "@playwright/test";

export class PaymentConfirmationPage {

    constructor(private readonly page: Page) { }

    readonly successmessage = this.page.locator('b:has-text("ORDER PLACED!")');
    readonly orderConfirmation = this.page.locator('p:has-text("Congratulations! Your order has been confirmed!")');
    readonly invoiceDownload = this.page.getByRole('link', { name: 'Download Invoice' });
    readonly continueButton = this.page.getByRole('link', { name: 'Continue' })

    async downloadInvoice(){
        await this.invoiceDownload.click();
    }

    async continueShopping(){
        await this.continueButton.click();
    }
}