import { test } from '@playwright/test';
import * as allure from 'allure-js-commons';

export async function applyAllureMetadata() {
  const testInfo = test.info();
  const titlePath = testInfo.titlePath();

  // Example: ['E-Commerce', 'Cart', 'Add item']

  if (titlePath.length > 0) {
    await allure.feature(titlePath[0]);
  }

  if (titlePath.length > 1) {
    await allure.story(titlePath[1]);
  }

  // Add test case name
  await allure.label('testCase', testInfo.title);

  // Auto tag (example)
  if (testInfo.title.includes('[SMOKE]')) {
    await allure.tag('smoke');
  }
}