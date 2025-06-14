import { Page, expect } from "@playwright/test";
import adminData from "../Fixtures/TestData/AdminData.json";
import locators from "../Fixtures/TestData/Locators.json";
import path from "path";

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
      const jobtitle= await this.enterNewJob();
      await this.verifyNewJob(jobtitle);
    }

      async createNewJob(){
        await this.page.locator(this.jobTabLocators.jobData.admin).click();
        await this.page.locator(this.jobTabLocators.jobData.jobTab).click();
        await this.page.locator(this.jobTabLocators.jobData.jobTitleTab).click();                   
      }
      async enterNewJob(){
        await this.page.locator(this.jobTabLocators.jobData.addButton).click();     
        const jobTitle =`${this.jobTestData.jobTab.jobTitle}_${Date.now()}`;
        console.log(jobTitle);
        await this.page.locator(this.jobTabLocators.jobData.jobTitle).fill(jobTitle);
        await this.page.getByPlaceholder("Type description here").fill(adminData.jobTab.jobDescription);
        await this.page.setInputFiles(this.jobTabLocators.jobData.fileUpload, path.join(__dirname, "../Fixtures/Attachments/butterfly.gif"));
        await this.page.locator(this.jobTabLocators.jobData.saveJob).click();
        return jobTitle;       
      }
      
      async verifyNewJob(jobtitle: string){
        await expect(this.page.locator(this.jobTabLocators.jobData.backPage)).toBeVisible();
        const getJob=await this.page.locator(this.jobTabLocators.jobData.VerifyNewJob).innerText();
        console.log("Total job ",getJob);
        await expect(this.page.locator(this.jobTabLocators.jobData.verifyJob).filter({hasText: jobtitle})).toContainText(jobtitle);
      }
}