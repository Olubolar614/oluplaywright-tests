const { When, Then,setDefaultTimeout } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const {PageConstant} = require('../../hooks/PageConstant');
setDefaultTimeout(60*1000*2);
When("I click Pim from the main menu",{ timeout: 20000 }, async function () {
  await PageConstant.page.locator("span.oxd-text.oxd-main-menu-item--name")
  .filter('innerText', text => text.includes('PIM')).nth(1).click();

});
When("I click add employee button", async function () {
  await PageConstant.page.locator("button.oxd-button.oxd-button--medium.oxd-button--secondary")
  .filter('innerText', text => text.includes('Add')).nth(1).click();
});
When(
  "I fill the employee form, and clicks on the save button",{ timeout: 20000 },
  async function (dataTable) {
    await Promise.all(dataTable.hashes().map(async (row) => {
      await PageConstant.page.locator("input[placeholder='First Name']").type(row.firstname);
      await PageConstant.page.locator("input[placeholder='Last Name']").type(row.lastname);
      await PageConstant.page.locator(".orangehrm-full-width-grid > div > div > div:nth-child(2) > input").type(row.employeeid);
      await PageConstant.page.locator("button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space").click();
    }));
  }
);

Then("I should see a success message", async function () {
  PageConstant.page.on('dialog', async dialog => {
    console.log('Alert message:', dialog.message());
    expect(dialog.message()).to.equal('Success');
  });
  await PageConstant.page.waitForTimeout(2000);
});

When(
  "I enter name {string} in the employee name field",
  async function (firstname) {
    await PageConstant.page.getByPlaceholder('Type for hints...').first().type(firstname);
    await PageConstant.page.waitForTimeout(2000);
  }
);

When("I click the search button", async function () {
  await PageConstant.page.locator("button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space")
  .filter('innerText', text => text.includes('Search')).click();
  await PageConstant.page.waitForTimeout(2000);
});

When(
  "I click the edit button in the search results table row",
  async function () {
    await PageConstant.page.waitForTimeout(2000);
    await PageConstant.page.locator('i.oxd-icon.bi-pencil-fill').first().click();
  }
);

When("I clear the firstname field", async function () {
  await PageConstant.page.waitForTimeout(2000);
  await PageConstant.page.locator("input[placeholder='First Name']").fill('');
});
When(
  "I enter new firstname {string}, and clicks on the save button",
  async function (firstname) {
    await PageConstant.page.waitForTimeout(2000);
    await PageConstant.page.locator("input[placeholder='First Name']").type(firstname);
    await PageConstant.page.locator('button.oxd-button.oxd-button--medium.oxd-button--secondary.orangehrm-left-space').first().click();
    await PageConstant.page.waitForTimeout(2000);
  }
);

When(
  "I click the delete button in the search results table row",
  async function () {
    await PageConstant.page.locator(".oxd-icon.bi-trash").first().click();
    await PageConstant.page.locator(".oxd-button--label-danger").click();
  }
);
