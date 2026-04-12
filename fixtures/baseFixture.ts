import { test as base } from '@playwright/test';
import { poManger } from '../objectrespo/pomanager';

type MyFixture ={
    pomanager:poManger;
}

export const test = base.extend<MyFixture>({
    pomanager: async({page},use)=>{
        const pomanager = new poManger(page)

        await use(pomanager)
    },
});

export { expect } from '@playwright/test';