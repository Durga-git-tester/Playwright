import { BasePage } from "./Basepage";
import testData from "../Fixtures/TestData/demoQaData.json";
import locator from "../Fixtures/TestData/demoQaLoc.json"
import { expect } from "@playwright/test";

export class WebTablePage extends BasePage{
    demoData: typeof testData;
    demoLoc: typeof locator;
    generateRandomFirstName: string= '';
    generateRandomLastName: string='';

    constructor(page: any,demoLoc: typeof locator, demoData: typeof testData){
        super(page);
        this.demoLoc= demoLoc;
        this.demoData= demoData;
    }
    async webTable(){
        await this.createRecord();
        await this.editWebtableRecord();
        await this.deleteRecord();
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
    }
    async editWebtableRecord(){
        await this.clickEdit();
        await this.enterFirstName();
        await this.enterLastName();
        await this.submitForm();
        await this.searchtheDataInWebTable();
    }
        async gotoWebTableDemaQa(){
        await this.gotoUrl(this.demoData.webTables.url);
    }
         async clickAdd(){
        await this.click(this.demoLoc.webTables.add);
        await expect(this.page.locator(this.demoLoc.webTables.registrationForm)).toBeVisible();
    }
        async enterFirstName(){
        this.generateRandomFirstName=await this.generateRandomName(this.demoLoc.webTables.firstName, this.demoData.webTables.firstName);
        return this.generateRandomFirstName;
    }
        async enterLastName(){
        this.generateRandomLastName=await this.generateRandomName(this.demoLoc.webTables.lastName, this.demoData.webTables.lastName);
        return this.generateRandomLastName;
    }
        async enterEmail(){
        await this.fill(this.demoLoc.webTables.email, this.demoData.webTables.email);
     }
        async enterAge(){
        await this.fill(this.demoLoc.webTables.age,this.demoData.webTables.age);
    } 
        async enterSalary(){
        await this.fill(this.demoLoc.webTables.salary, this.demoData.webTables.salary);
    }
        async enterDepartment(){
        await this.fill(this.demoLoc.webTables.department, this.demoData.webTables.Department);
    }
        async submitForm(){
        await this.click(this.demoLoc.webTables.submit);
    }
        async searchtheDataInWebTable(){
        const row = this.page
        .locator(this.demoLoc.webTables.recordTable)
        .getByRole('row', {
          name: `${this.generateRandomFirstName} ${this.generateRandomLastName} ${this.demoData.webTables.age} ${this.demoData.webTables.email} ${this.demoData.webTables.salary} ${this.demoData.webTables.Department}`,
        });      
        console.log(await row.textContent());
      
        await expect(this.page
        .locator(this.demoLoc.webTables.recordTable)
        .getByRole('row', {
          name: `${this.generateRandomFirstName} ${this.generateRandomLastName} ${this.demoData.webTables.age} ${this.demoData.webTables.email} ${this.demoData.webTables.salary} ${this.demoData.webTables.Department}`,
        })
        ).toBeVisible();
    }
        async clickEdit(){
        await this.page.locator(this.demoLoc.webTables.recordTable).filter({hasText: this.generateRandomFirstName }).locator(this.demoLoc.webTables.edit).click();
        await expect(this.page.locator(this.demoLoc.webTables.registrationForm)).toBeVisible();             
    }
        async deleteRecord(){
        await this.page.locator(this.demoLoc.webTables.recordTable).filter({hasText: this.generateRandomFirstName }).locator(this.demoLoc.webTables.delete).click();         
        const row = this.page.locator(this.demoLoc.webTables.recordTable).filter({ hasText: this.generateRandomFirstName });
        await expect(row).toHaveCount(0);
    }   
}