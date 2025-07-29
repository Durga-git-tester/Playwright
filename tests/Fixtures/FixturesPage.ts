import { test as baseTest, expect as baseExpect } from "@playwright/test";

import adminData from "../Fixtures/TestData/AdminData.json";
import  locators from "../Fixtures/TestData/Locators.json";
import demoQaData from "../Fixtures/TestData/demoQaData.json";
import demoQaLoc  from "../Fixtures/TestData/demoQaLoc.json";
import {WebTablePage} from "../Page/WebTablePage"; 
import { LoginPage } from "../Page/LoginPage";
import { AdminJobPage } from "../Page/AdminJobPage";
import { SelectMenuPage } from "../Page/SelectMenuPage";
import { TextBoxPage } from "../Page/TextBoxPage";

type AllFixtures = {
  adminLocators: typeof locators;
  adminTestData: typeof adminData;
  demoData: typeof demoQaData;
  demoLoc: typeof demoQaLoc;
  loginPage: LoginPage;
  jopPage: AdminJobPage;
  webTablePage: WebTablePage;
  selectMenuPage: SelectMenuPage;
  textBoxPage: TextBoxPage;
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
  demoData: async({}, use)=>{
    const webData=  demoQaData;
    await use(webData);
  },
  demoLoc: async({}, use)=>{
    const demoLoc= demoQaLoc;
    await use (demoLoc);
  },
  webTablePage: async({page, demoLoc, demoData }, use)=>{
    const webTablePage= new WebTablePage(page, demoLoc, demoData)
    await use( webTablePage);
  },
  selectMenuPage: async({page, demoLoc, demoData}, use)=>{
    const selectMenuPage =new SelectMenuPage(page, demoLoc, demoData)
    await use(selectMenuPage);
  },
  textBoxPage: async({page, demoLoc, demoData}, use)=>{
    const textBoxPage = new TextBoxPage(page, demoLoc, demoData)
    await use(textBoxPage);
  }

});
export const expect = baseExpect;
