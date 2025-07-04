import { test as baseTest, expect as baseExpect } from "@playwright/test";

import adminData from "../Fixtures/TestData/AdminData.json";
import  locators from "../Fixtures/TestData/Locators.json";
import webTableData from "../Fixtures/TestData/webTableData.json";
import webTableLoc  from "../Fixtures/TestData/webTableLoc.json";
import {WebTablePage} from "../Page/WebTablePage"; 
import { LoginPage } from "../Page/LoginPage";
import { AdminJobPage } from "../Page/AdminJobPage";

type AllFixtures = {
  adminLocators: typeof locators;
  adminTestData: typeof adminData;
  webData: typeof webTableData;
  webLoc: typeof webTableLoc;
  loginPage: LoginPage;
  jopPage: AdminJobPage;
  webTablePage: WebTablePage;
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
  },
  webData: async({}, use)=>{
    const webData=  webTableData;
    await use(webData);
  },
  webLoc: async({}, use)=>{
    const webLoc= webTableLoc;
    await use (webLoc);
  },
  webTablePage: async({page, webLoc, webData}, use)=>{
    const webTablePage= new WebTablePage(page, webLoc, webData)
    await use( webTablePage);
  }

});
export const expect = baseExpect;
