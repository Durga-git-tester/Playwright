import {test} from "./Fixtures/FixturesPage";

test.describe ("Demoqa", () =>{

test("webtables", async({webTablePage})=>{
    await webTablePage.webTable();
    
});
test("SelectMenu", async({selectMenuPage})=>{
    await selectMenuPage.selectOptions();
    
});
test("TextBox", async({textBoxPage})=>{
    await textBoxPage.textBox();
});
test("checkBox", async({checkBoxPage})=>{
    await checkBoxPage.checkBox();
});

})