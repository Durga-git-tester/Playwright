import { Page } from "@playwright/test";

export class BasePage {
page: Page;
    constructor(page: any){
        this.page=page;
    }

    async gotoUrl(url: any) {
       await this.page.goto(url);
  }

  async click(locator: any){
    await this.page.locator(locator).click();
  }
  async fill (locator:any, testData:any){
    await this.page.locator(locator).fill(testData);
  }
}