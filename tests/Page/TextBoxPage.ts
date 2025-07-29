import { BasePage } from "./Basepage";
import testData from "../Fixtures/TestData/demoQaData.json";
import locator from "../Fixtures/TestData/demoQaLoc.json";
import { expect } from "../Fixtures/FixturesPage";

export class TextBoxPage extends BasePage{
    demoLoc: typeof locator;
    demoData: typeof testData;

    constructor(page: any, demoLoc: typeof locator, demoData: typeof testData){
        super(page);
        this.demoLoc=demoLoc;
        this.demoData=demoData;
    }
    async textBox(){
        await this.gotoUrl(this.demoData.textBox.url);
        await this.enterFullName();
        await this.enterEmail();
        await this.entercurrentAddress();
        await this.enterPermenentAddress();
        await this.clickSubmit();
        await this.verifyOutput();
    }
    
    async enterFullName(){
        await this.fill(this.demoLoc.TextBox.fullName, this.demoData.textBox.fullName);
    }
    async enterEmail(){
        await this.fill(this.demoLoc.TextBox.email, this.demoData.textBox.email);
    }
    async entercurrentAddress(){
        await this.fill(this.demoLoc.TextBox.currentAddress, this.demoData.textBox.currentAddress);
    }
    async enterPermenentAddress(){
        await this.fill(this.demoLoc.TextBox.permenentAddress, this.demoData.textBox.permanentAddress);
    }
    async clickSubmit(){
        await this.click(this.demoLoc.TextBox.submitBtn);
    }
    async verifyOutput(){
        await expect(this.page.locator(this.demoLoc.TextBox.output)).toBeVisible();
        const output= await this.page.locator(this.demoLoc.TextBox.output).innerText();
        console.log(output);
        expect(output).toContain(this.demoData.textBox.fullName);
        expect(output).toContain(this.demoData.textBox.email);
        expect(output).toContain(this.demoData.textBox.currentAddress);
        expect(output).toContain(this.demoData.textBox.permanentAddress);
    }

}