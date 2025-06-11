import { test } from "./Fixtures/FixturesPage";

test.describe("orangeHRM", () => {
  test("login", async ({ loginPage ,jopPage}) => {
    await loginPage.login();
    await jopPage.createJob();
  });
  
  // test("createjob",async({jopPage})=>{
     // });

});
