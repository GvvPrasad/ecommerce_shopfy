import { test as base } from '@playwright/test';
import { poManger } from '../objectrespo/pomanager';
import { applyAllureMetadata } from '../utils/allure/allureAutoMapper';
import { AllureUtils } from '../utils/allure/allureUtils';

type MyFixture ={
    pomanager:poManger;
    allurmetadata:applyAllureMetadata;
}

export const test = base.extend<MyFixture>({
    pomanager: async({page},use)=>{
        const pomanager = new poManger(page)
        await use(pomanager)
    },
});

export { expect } from '@playwright/test';