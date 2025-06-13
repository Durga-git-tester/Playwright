import { test } from "./Fixtures/FixturesPage";

test.describe("OrangeHRM", () => {
  test.beforeEach("login", async ({ loginPage }) => {
    await loginPage.login();
  });

  test("createjob", async ({ jopPage }) => {
    //await loginPage.login();
    await jopPage.createJob();
  });
});