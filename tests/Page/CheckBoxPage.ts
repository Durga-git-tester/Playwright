import { expect } from "../Fixtures/FixturesPage";
import testData from "../Fixtures/TestData/demoQaData.json";
import locator from "../Fixtures/TestData/demoQaLoc.json";
import { BasePage } from "./Basepage";
export class CheckBoxPage extends BasePage{

    demoLoc: typeof locator;
    demoData: typeof testData;
    constructor(page: any, demoLoc: typeof locator, demoData: typeof testData) {
        super(page);
        this.demoLoc=demoLoc;
        this.demoData=demoData;
    }

    async clickExpand(){
        await this.click(this.demoLoc.checkBox.expandBtn);
    }
    async clickCollapsed(){
        await this.click(this.demoLoc.checkBox.collapseBtn);
    }
    async clickCheckBox(){
        await this.click(this.demoLoc.checkBox.homeCheckBox);
    }
    async verifyResult(){
        await expect(this.page.locator(this.demoLoc.checkBox.result)).toBeVisible();
    }
    async verifyResultoBeEmpty(){
        await expect(this.page.locator(this.demoLoc.checkBox.result)).toBeHidden();
    }
    async checkBox(){
        await this.gotoUrl(this.demoData.checkBox.url);
        await this.clickExpand();
        await this.clickCheckBox();
        await this.verifyResult();
        await this.clickCheckBox();
        await this.verifyResultoBeEmpty();
        await this.clickCollapsed();
    }

}