import { Page } from "@playwright/test";

export class ProductDetailsPage {
    constructor(private readonly page: Page) { }

    readonly productName = this.page.locator('.product-information h2');
    readonly productPrice = this.page.getByText('Rs.');
    readonly quantity = this.page.locator('#quantity');
    readonly addToCartButton = this.page.getByRole('button', { name: 'Add to cart' })
    
    readonly modelPopup = this.page.locator('div.modal-content');
    readonly productAddedMessage = this.page.locator('.modal-content .modal-title');
    readonly modalViewCart = this.page.locator('.modal-content a');
    readonly modalShopping = this.page.locator('.modal-content button');
    
    readonly reviewContainer = this.page.locator('#reviews #review-form');
    readonly reviewerName = this.page.getByPlaceholder('Your Name');
    readonly reviewerEmail = this.page.locator('#email');
    readonly reviewComments = this.page.getByPlaceholder('Add Review Here!');
    readonly reviewSubmit = this.page.locator('#button-review');
    readonly reviewSuccessMessage = this.page.locator('.alert-success span');

    async enterQuantity(quantity: string) {
        await this.quantity.fill(quantity);
    }

    async clickAddToCart() {
        await this.addToCartButton.click();
    }

    async cartfromModel() {
        await this.modalViewCart.click();
    }

    async continueShoppingFromModal() {
        await this.modalShopping.click();
    }

    async enterReview(rname: string, remail: string, comments: string) {
        await this.reviewerName.fill(rname);
        await this.reviewerEmail.fill(remail);
        await this.reviewComments.fill(comments)
    }

    async submitReview(){
        await this.reviewSubmit.click();
    }

}