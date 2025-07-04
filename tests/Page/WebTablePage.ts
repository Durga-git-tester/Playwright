import { BasePage } from "./Basepage";
import testdata from "../Fixtures/TestData/webTableData.json";
import locator from "../Fixtures/TestData/webTableLoc.json"
import { expect } from "@playwright/test";

export class WebTablePage extends BasePage{
    webData: typeof testdata;
    webLoc: typeof locator;
    generateRandomFirstName: string= '';
    generateRandomLastName: string='';

    constructor(page: any,webLoc: typeof locator, webData: typeof testdata){
        super(page);
        this.webData= webData;
        this.webLoc= webLoc;
    }
    async createRecord(){
        await this.gotoWebTableDemaQa();
        await this.clickAdd();
        await this.enterFirstName();
        await this.enterLastName();
        await this.enterEmail();
        await this.enterAge();
        await this.enterSalary();
        await this.enterDepartment();
        await this.submitForm();
        await this.searchtheDataInWebTable();
        await this.editRecord();
        await this.verifyEditedDetailIsDisplayed();
        await this.deleteRecord();
    }
    async gotoWebTableDemaQa(){
        await this.gotoUrl(this.webData.webTables.url);
    }
    async clickAdd(){
        await this.click(this.webLoc.webTables.add);
        await expect(this.page.locator(this.webLoc.webTables.registrationForm)).toBeVisible();
    }
   async enterFirstName(){
        this.generateRandomFirstName=await this.generateRandomName(this.webLoc.webTables.firstName, this.webData.webTables.firstName);
        return this.generateRandomFirstName;
    }
    async enterLastName(){
        this.generateRandomLastName=await this.generateRandomName(this.webLoc.webTables.lastName, this.webData.webTables.lastName);
        return this.generateRandomLastName;
    }
    async enterEmail(){
        await this.fill(this.webLoc.webTables.email, this.webData.webTables.email);
     }
    async enterAge(){
        await this.fill(this.webLoc.webTables.age,this.webData.webTables.age);
    } 
    async enterSalary(){
        await this.fill(this.webLoc.webTables.salary, this.webData.webTables.salary);
    }
    async enterDepartment(){
        await this.fill(this.webLoc.webTables.department, this.webData.webTables.Department);
    }
    async submitForm(){
        await this.click(this.webLoc.webTables.submit);
    }
    async searchtheDataInWebTable(){
        const row = this.page.locator(this.webLoc.webTables.recordTable).filter({ hasText: this.generateRandomFirstName });
        await expect(row.getByText(this.generateRandomLastName)).toBeVisible();
        await expect(row.getByText(this.webData.webTables.email)).toBeVisible();
        await expect(row.getByText(this.webData.webTables.age, {exact: true})).toBeVisible();
        await expect(row.getByText(this.webData.webTables.salary, {exact: true})).toBeVisible();
        await expect(row.getByText(this.webData.webTables.Department, {exact: true})).toBeVisible();
    }
    async editRecord(){
      //  await this.page.getByRole(this.webLoc.webTables.recordTable, {hasText: this.generateRandomFirstName } ).locator(this.webLoc.webTables.edit).click();
        await expect(this.page.locator(this.webLoc.webTables.registrationForm)).toBeVisible();
        await this.enterFirstName();
        await this.enterLastName();
        await this.submitForm();        
    }
    async verifyEditedDetailIsDisplayed(){
        const row = this.page.locator(this.webLoc.webTables.recordTable).filter({ hasText: this.generateRandomFirstName });
        await expect(row.getByText(this.generateRandomLastName)).toBeVisible(); 
    }
    async deleteRecord(){
        await this.click(this.webLoc.webTables.delete);
        const row = this.page.locator(this.webLoc.webTables.recordTable).filter({ hasText: this.generateRandomFirstName });
        await expect(row).toHaveCount(0);
    }
   
}