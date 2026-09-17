import {test,expect,Locator} from "@playwright/test";
//import { text } from "node:stream/consumers";

test('Single select Drop Down', async({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/", {
        waitUntil:"load",
        timeout: 60000
    }); 

    //1. Select option from the drop down(4 ways)

    //by using visible text
    await page.locator('#country').selectOption('United States');
    await page.waitForTimeout(2000);

    //by using value attribute
    await page.locator('#country').selectOption({value:'uk'});
    await page.waitForTimeout(2000);

    //by using label attribute
    await page.locator('#country').selectOption({label:'India'});
    await page.waitForTimeout(2000);

    //by using index attribute
    await page.locator('#country').selectOption({index:1});
    await page.waitForTimeout(2000);



    //2. Check number(count) of options in the dropdown
    const dropDownOptions:Locator = page.locator('#country>option');
    await expect(dropDownOptions).toHaveCount(10);
    await page.waitForTimeout(2000);


    //3. Check an option present in the dropdowns
    const optionsText:string[] = (await dropDownOptions.allTextContents()).map(text => text.trim());
    //console.log(optionsText);
    expect(optionsText).toContain('Japan');


    //4. printing options from the drop down
    for(const options of optionsText)
    {
        console.log(options);
    }

});