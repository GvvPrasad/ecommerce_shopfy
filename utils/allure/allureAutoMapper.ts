import { test } from '@playwright/test';
import * as allure from 'allure-js-commons';

export async function applyAllureMetadata() {
  const testInfo = test.info();
  const path = testInfo.titlePath;

  // Example:
  // ['E-Commerce', 'Checkout', '@smoke Valid Order']

  if (path.length > 0) await allure.epic(path[0]);     // Epic
  if (path.length > 1) await allure.feature(path[1]);  // Feature

  await allure.story(testInfo.title);                  // Story

  // Extract tags from title
  const tags = testInfo.title.match(/@\w+/g);
  if (tags) {
    for (const tag of tags) {
      await allure.tag(tag.replace('@', ''));
    }
  }
}