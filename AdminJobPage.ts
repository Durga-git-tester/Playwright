import { Page, expect } from "@playwright/test";
import adminData from "../Fixtures/TestData/AdminData.json";
import locators from "../Fixtures/TestData/Locators.json";

export class AdminJobPage {
    page: Page
    jobTabLocators: typeof locators;
    jobTestData: typeof adminData;
    
    constructor(page: any, jobTabLocators: any, jobTestData: any){
        this.page=page;
        this.jobTabLocators=jobTabLocators;
        this.jobTestData=jobTestData;
    }

    async createJob(){
      await this.createNewJob();
      await this.verifyNewJob();
    }

    async createNewJob(){
        await this.page.locator(this.jobTabLocators.jobData.admin).click();
        await this.page.locator(this.jobTabLocators.jobData.jobTab).click();
        await this.page.locator(this.jobTabLocators.jobData.jobTitleTab).click();
        await this.page.locator(this.jobTabLocators.jobData.addButton).click();
        await this.page.locator(this.jobTabLocators.jobData.jobTitle).fill(this.jobTestData.jobTab.jobTitle);
        await this.page.getByPlaceholder("Type description here").fill(adminData.jobTab.jobDescription);
        await this.page.locator(this.jobTabLocators.jobData.saveJob).click();
       
      }
      async verifyNewJob(){
        await expect(this.page.locator(this.jobTabLocators.jobData.backPage)).toBeVisible();
        const getJob=await this.page.locator(this.jobTabLocators.jobData.VerifyNewJob).innerText();
        console.log("Total job ",getJob);
      }


}