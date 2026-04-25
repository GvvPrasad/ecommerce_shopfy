import { Page } from "@playwright/test";

export class ProductDetailsPage {
    constructor(private readonly page: Page) { }

    readonly productName = this.page.locator('.product-information h2');
    readonly productCategory = this.page.locator('.product-information p').first();
    readonly productPrice = this.page.getByText('Rs.');
    readonly reviewerName = this.page.getByPlaceholder('Your Name');
    readonly reviewerEmail = this.page.locator('#email');
    readonly reviewComments = this.page.getByPlaceholder('Add Review Here!');
    readonly reviewSubmit = this.page.locator('#button-review');
    readonly successMessage = this.page.locator('.alert-success span');
    readonly quantity = this.page.locator('#quantity');
    readonly addToCartButton = this.page.getByRole('button', { name: 'Add to cart' })
    readonly popup = this.page.locator('div.modal-content');
    readonly confirmMessage = this.page.locator('.modal-content .modal-title');
    readonly modalViewCart = this.page.locator('.modal-content a');
    readonly modalShopping = this.page.locator('.modal-content button');

    async submitReview(rname: string, remail: string, comments: string) {
        await this.reviewerName.fill(rname);
        await this.reviewerEmail.fill(remail);
        await this.reviewComments.fill(comments)
        await this.reviewSubmit.click();
    }

    async enterQuantity(quantity: string){
        await this.quantity.fill(quantity);
    }

    async clickAddToCart(){
        await this.addToCartButton.click();
    }

    async viewCartFromModal(){
        await this.modalViewCart.click();
    }

    async continueShoppingFromModal(){
        await this.modalShopping.click();
    }

}