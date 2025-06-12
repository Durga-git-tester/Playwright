import { test } from "./Fixtures/FixturesPage";

test.describe("orangeHRM", () => {
  test("login", async ({ loginPage}) => {
    await loginPage.login();
    
  });
  
   test("createjob",async({loginPage, jopPage})=>{
      await loginPage.login();
    await jopPage.createJob();
     });

});
