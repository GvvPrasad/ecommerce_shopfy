import { Page } from "@playwright/test";

export class OrderConfirmationPage {

    constructor(private readonly page: Page) { }

    readonly orderConfirmationText = this.page.locator('b:has-text("ORDER PLACED!")');
    readonly successMessage = this.page.locator('p:has-text("Congratulations! Your order has been confirmed!")');
    readonly invoiceDownload = this.page.getByRole('link', { name: 'Download Invoice' });
    readonly continueButton = this.page.getByRole('link', { name: 'Continue' })

    async downloadInvoice(){
        await this.invoiceDownload.click();
    }

    async continueShopping(){
        await this.continueButton.click();
    }
}