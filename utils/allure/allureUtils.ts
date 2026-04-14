import * as allure from 'allure-js-commons';

export class AllureUtils {

  static async addEnvironment() {

    await allure.label('environment', process.env.ENV || 'QA');

    await allure.label('browser', process.env.BROWSER || 'chromium');

    await allure.label('baseURL', process.env.BASE_URL || 'N/A');

    await allure.label('execution', process.env.EXECUTION || 'local');
  }

}