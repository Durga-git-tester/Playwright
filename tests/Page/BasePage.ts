import { expect, Page } from "@playwright/test";

export class BasePage {
page: Page;
  constructor(page: any){
      this.page=page;
  }
  async gotoUrl(url: any) {
    await this.page.goto(url, {waitUntil: 'domcontentloaded'});
  }
  async click(locator: any){
    await this.page.locator(locator).click();
  }
  async fill (locator:any, testData:any){
    await this.page.locator(locator).fill(testData);
  }
  async toBeVisible (locator: any){
    await expect(this.page.locator(locator)).toBeVisible();
  }
  async getbyRole( role: any, namevalue: any, exact: boolean= true){
    await this.page.getByRole(role, {name: namevalue,exact}).click();
  }
  async generateRandomName(locator: any, testdata: any){
    const randomNumber= await this.generateRandomNumber();
    const name= testdata+ randomNumber
    await this.fill(locator, name); 
    const getdynamicname=await this.page.locator(locator).inputValue();
    console.log(getdynamicname);  
    return getdynamicname;    
  }
  async generateRandomNumber(){
    const randomNumber =new Date().getTime();
     return randomNumber;
  }

}