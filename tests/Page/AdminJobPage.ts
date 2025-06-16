import { Page, expect } from "@playwright/test";
import adminData from "../Fixtures/TestData/AdminData.json";
import locators from "../Fixtures/TestData/Locators.json";
import path from "path";

export class AdminJobPage {
    page: Page
    adminLocators: typeof locators;
    adminTestData: typeof adminData;
    
    constructor(page: any, adminLocators: any, adminTestData: any){
        this.page=page;
        this.adminLocators=adminLocators;
        this.adminTestData=adminTestData;
    }
    async createJob(){
      await this.createNewJob();
      const jobtitle= await this.enterNewJob();
      await this.verifyNewJob(jobtitle);
    }

      async createNewJob(){
        await this.page.locator(this.adminLocators.jobData.admin).click();
        await this.page.locator(this.adminLocators.jobData.jobTab).click();
        await this.page.locator(this.adminLocators.jobData.jobTitleTab).click();                   
      }
      async enterNewJob(){
        const jobTitle =`${this.adminTestData.jobTab.jobTitle}_${Date.now()}`;
        console.log(jobTitle);
        await this.page.locator(this.adminLocators.jobData.addButton).click();     
        await this.page.locator(this.adminLocators.jobData.jobTitle).fill(jobTitle);
        await this.page.getByPlaceholder("Type description here").fill(adminData.jobTab.jobDescription);
        await this.page.setInputFiles(this.adminLocators.jobData.fileUpload, path.join(__dirname, "../Fixtures/Attachments/butterfly.gif"));
        await this.page.locator(this.adminLocators.jobData.saveJob).click();
        return jobTitle;       
      }
      
      async verifyNewJob(jobtitle: string){
        await expect(this.page.locator(this.adminLocators.jobData.backPage)).toBeVisible();
        const getJob=await this.page.locator(this.adminLocators.jobData.VerifyNewJob).innerText();
        console.log("Total job ",getJob);
        await expect(this.page.locator(this.adminLocators.jobData.verifyJob).filter({hasText: jobtitle})).toContainText(jobtitle);
      }
}