import {test} from "./Fixtures/FixturesPage";

test("webtables", async({webTablePage})=>{
    await webTablePage.createRecord();
    
});

test("SelectMenu", async({selectMenuPage})=>{
    await selectMenuPage.gotoSelectMenu();
    await selectMenuPage.selectValue();
    await selectMenuPage.selectOne();
});
