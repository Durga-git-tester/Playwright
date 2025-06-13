import { Page } from "@playwright/test";
//import { Page, expect } from "@playwright/test";
// import adminData from "../Fixtures/TestData/AdminData.json";
// import locators from "../Fixtures/TestData/Locators.json";
import { expect } from "../Fixtures/FixturesPage";

export class LoginPage {
  page: Page;
  adminLocator: any;
  adminTestData: any;

  constructor(page: any, adminLocator: any, adminTestData: any) {
    this.page = page;
    this.adminLocator = adminLocator;
    this.adminTestData = adminTestData;
  }

  async gotoUrl() {
       await this.page.goto(this.adminTestData.baseValue.url);
  }
  async enterUserName() {
    await this.page
      .locator(this.adminLocator.baseData.userName)
      .fill(this.adminTestData.baseValue.userName);
  }
  async enterPassword() {
    await this.page
      .locator(this.adminLocator.baseData.passWord)
      .fill(this.adminTestData.baseValue.passWord);
  }
  async clickSignIn() {
    await this.page.locator(this.adminLocator.baseData.login).click();
  }
  async verifyTitle() {
    await expect(this.page).toHaveTitle("OrangeHRM");
  }

  async login() {
    await this.gotoUrl();
    await this.enterUserName();
    await this.enterPassword();
    await this.clickSignIn();
    await this.verifyTitle();
  }
  
 
}
