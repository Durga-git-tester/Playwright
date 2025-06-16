import { expect } from "@playwright/test";
import adminData from "../Fixtures/TestData/AdminData.json";
import locators from "../Fixtures/TestData/Locators.json";
import path from "path";
import { BasePage } from "./Basepage";

export class AdminJobPage extends BasePage{
   
    adminLocators: typeof locators;
    adminTestData: typeof adminData;
    
    constructor(page: any, adminLocators: any, adminTestData: any){
      super(page);
        this.adminLocators=adminLocators;
        this.adminTestData=adminTestData;
    }
    async createJob(){
      await this.createNewJob();
      const jobtitle= await this.enterNewJob();
      await this.verifyNewJob(jobtitle);
    }

      async createNewJob(){
        await this.click(this.adminLocators.jobData.admin);
        await this.click(this.adminLocators.jobData.jobTab);
        await this.click(this.adminLocators.jobData.jobTitleTab);                   
      }
      async enterNewJob(){
        const jobTitle =`${this.adminTestData.jobTab.jobTitle}_${Date.now()}`;
        console.log(jobTitle);
        await this.click(this.adminLocators.jobData.addButton);     
        await this.fill(this.adminLocators.jobData.jobTitle,jobTitle);
        await this.page.getByPlaceholder("Type description here").fill(adminData.jobTab.jobDescription);
        await this.page.setInputFiles(this.adminLocators.jobData.fileUpload, path.join(__dirname, "../Fixtures/Attachments/butterfly.gif"));
        await this.click(this.adminLocators.jobData.saveJob);
        return jobTitle;       
      }
      
      async verifyNewJob(jobtitle: string){
        await this.toBeVisible(this.adminLocators.jobData.backPage);
        const getJob=await this.page.locator(this.adminLocators.jobData.VerifyNewJob).innerText();
        console.log("Total job ",getJob);
        await expect(this.page.locator(this.adminLocators.jobData.verifyJob).filter({hasText: jobtitle})).toContainText(jobtitle);
      }
}