const {Before, After, BeforeAll, AfterAll} = require('@cucumber/cucumber');
const {chromium} = require('@playwright/test');
const {PageConstant} = require('./PageConstant.js');
let page;
let browser;
let context;
BeforeAll(async function(){
    browser =await chromium.launch({headless:true});
})
Before(async function(){
    context =await browser.newContext();
    const page = await context.newPage();
    PageConstant.page = page;
});
After(async function(pickle) {
    if (PageConstant.page) {
        const img = await PageConstant.page.screenshot({ path: `./test-result/screenshot/${pickle.name}.png`, type: "png" });
        await this.attach(img, "image/png");
    }
    await PageConstant.page.close();
    await context.close();
});
AfterAll(async function(){
    await browser.close();
})