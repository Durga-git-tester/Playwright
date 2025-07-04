//import { Page, expect } from "@playwright/test";
// import adminData from "../Fixtures/TestData/AdminData.json";
// import locators from "../Fixtures/TestData/Locators.json";
import { expect } from "../Fixtures/FixturesPage";
import { BasePage } from "./Basepage";

export class LoginPage extends BasePage{
 
  adminLocator: any;
  adminTestData: any;

  constructor(page: any, adminLocator: any, adminTestData: any) {
    super(page);
    this.adminLocator = adminLocator;
    this.adminTestData = adminTestData;
  }
    async enterUserName() {
    await this.fill(this.adminLocator.baseData.userName,process.env.USERNAME);
  }
  async enterPassword() {
    await this.fill(this.adminLocator.baseData.passWord,process.env.PASSWORD);
     }
  async clickSignIn() {
    await this.click(this.adminLocator.baseData.login);
  }
  async verifyTitle() {
    await expect(this.page).toHaveTitle("OrangeHRM");
  }

  async login() {
    await this.gotoUrl(process.env.URL);
    await this.enterUserName();
    await this.enterPassword();
    await this.clickSignIn();
    await this.verifyTitle();
  }
}
