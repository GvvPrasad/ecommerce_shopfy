import { Page } from '@playwright/test';
import { gobleObject } from '../objectrespo/gobleObjects';
import { Header } from '../pages/header.page';
import { SignUpPage } from '../pages/signup.page';
import {registerPage} from '../pages/register.page';
import { LoginPage } from '../pages/login.page';


export class poManger {

    constructor(private readonly page: Page) { }

    readonly header = new Header(this.page);
    readonly signuppage = new SignUpPage(this.page);
    readonly gobleobjects = new gobleObject();
    readonly registerpage = new registerPage(this.page);
    readonly loginpage = new LoginPage(this.page);
}