import * as allure from 'allure-js-commons';

export class AllureAttachments {
  static async attachScreenshot(name: string, buffer: Buffer) {
    await allure.attachment(name, buffer, 'image/png');
  }
}