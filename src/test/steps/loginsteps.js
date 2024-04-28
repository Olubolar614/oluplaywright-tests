const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { PageConstant } = require("../../hooks/PageConstant");
setDefaultTimeout(60 * 1000 * 2);
Given(
  "A web browser is at the orangehrm login page",
  { timeout: 20000 },
  async function () {
    await PageConstant.page.goto("https://opensource-demo.orangehrmlive.com");
  }
);
When(
  "A user enters the username {string}, the password {string}, and clicks on the login button",
  async function (username, password) {
    await PageConstant.page
      .locator("input[placeholder='Username']")
      .type(username);
    await PageConstant.page
      .locator("input[placeholder='Password']")
      .type(password);
    await PageConstant.page
      .locator("button.oxd-button.orangehrm-login-button")
      .click();
  }
);

Then("the url will contains the index subdirectory", async function () {
  const currentURL = PageConstant.page.url();
  expect(currentURL).toContain("/index");
});
