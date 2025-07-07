import testData from "../Fixtures/TestData/demoQaData.json";
import locator from "../Fixtures/TestData/demoQaLoc.json";
import { BasePage } from "./Basepage";

export class SelectMenuPage extends BasePage{
demoLoc: typeof locator;
demoData: typeof testData;

constructor(page: any, demoLoc: typeof locator, demoData: typeof testData){
    super(page);
    this.demoLoc =demoLoc;
    this.demoData=demoData;
}
async selectOptions(){
    await this.gotoSelectMenu();
    await this.selectValue();
    await this.selectOne();
}

async gotoSelectMenu(){
    await this.gotoUrl(this.demoData.selectMenu.url);
    
}
async selectValue(){
    await this.page.locator(this.demoLoc.selectMenu.selectValue).click();
    await this.page.getByText('Group 1, option 1', { exact: true }).click();
}

async selectOne(){
    await this.click(this.demoLoc.selectMenu.selectOne);
    await this.page.getByText('Prof.').click();
   }
}