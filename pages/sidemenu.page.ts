import { Page } from "@playwright/test";

export class SideMenuPage {
    constructor (private readonly page: Page) {}

    readonly women = this.page.getByRole('link',{name:'Women'})
    readonly men = this.page.getByRole('link',{name:'Men'})
    readonly kids = this.page.getByRole('link',{name:'Kids'})

}