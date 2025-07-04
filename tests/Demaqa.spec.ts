import {test} from "./Fixtures/FixturesPage";

test("webtables", async({webTablePage})=>{
    await webTablePage.createRecord();
    
});
