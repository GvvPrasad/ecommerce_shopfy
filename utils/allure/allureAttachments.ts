import * as allure from 'allure-js-commons';

export class AllureAttachments {

  static async attachScreenshot(name: string, buffer: Buffer) {
    await allure.attachment(name, buffer, 'image/png');
  }

  static async attachJSON(name: string, data: any) {
    await allure.attachment(name, JSON.stringify(data, null, 2), 'application/json');
  }

}