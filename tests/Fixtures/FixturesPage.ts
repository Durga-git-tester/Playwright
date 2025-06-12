import { test as baseTest, expect as baseexpect } from "@playwright/test";

import adminData from "../Fixtures/TestData/AdminData.json";
import  locators from "../Fixtures/TestData/Locators.json";
import { LoginPage } from "../Page/LoginPage";
import { AdminJobPage } from "../Page/AdminJobPage";

type AllFixtures = {
  adminLocators: typeof locators;
  adminTestData: typeof adminData;
  loginPage: LoginPage;
  jopPage: AdminJobPage;
};

export const test = baseTest.extend<AllFixtures>({
  adminLocators: async ({}, use) => {
    const adminLocators = locators;
    await use(adminLocators);
  },

  adminTestData: async ({}, use) => {
    const adminTestData = adminData;
    await use(adminTestData);
  },
  loginPage: async ({ page, adminLocators, adminTestData }, use) => {
    const loginPage = new LoginPage(page, adminLocators, adminTestData);
    await use(loginPage);
  },
  jopPage: async({ page, adminLocators, adminTestData}, use)=>{
    const jopPage= new AdminJobPage (page, adminLocators, adminTestData);
    await use(jopPage);
  }
});
export const expect = baseexpect;
