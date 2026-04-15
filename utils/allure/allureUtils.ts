import * as allure from 'allure-js-commons';
import { test } from '@playwright/test';
import { ENV_CONFIG } from '../../env/env';

export class AllureUtils {

  // Add dynamic environment details to Allure report
   
  static async addEnvironmentDetails() {
    const testInfo = test.info();

    await allure.label('environment', ENV_CONFIG.ENV);
    await allure.label('baseURL', ENV_CONFIG.BASE_URL);

    // Browser from Playwright project
    await allure.label('browser', testInfo.project.name);
  }

  // Add severity (critical, normal, minor)
  static async addSeverity(level: 'critical' | 'normal' | 'minor') {
    await allure.severity(level);
  }

  //Add test owner (useful in teams)
  static async addOwner(owner: string) {
    await allure.owner(owner);
  }

  //Add custom tags (beyond @smoke parsing)
  static async addTag(tag: string) {
    await allure.tag(tag);
  }

  //Add description (visible in report)
  static async addDescription(description: string) {
    await allure.description(description);
  }

  //Add test link (e.g., Jira, TestRail)
  static async addLink(name: string, url: string) {
    await allure.link(url, name);
  }

  //Add issue link (e.g., bug ID)
  static async addIssue(issueId: string, url: string) {
    await allure.issue(url, issueId);
  }
}