import {test,expect,Locator} from "@playwright/test";

test('Multi Select Drop Down', async({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/", {
        waitUntil:"load",
        timeout: 60000
    }); 

    //1. Select option from the drop down(4 ways)

    //by using visible text
    await page.locator('#colors').selectOption(['Red', 'Blue', 'Green']);
    await page.waitForTimeout(2000);

    //by using value attribute
    await page.locator('#colors').selectOption(['Yellow', 'White', 'Green']);
    await page.waitForTimeout(2000);

    //by using label attribute
    await page.locator('#colors').selectOption([{label:'Red'},{label:'Green'}]);
    await page.waitForTimeout(2000);

    //by using index attribute
    await page.locator('#colors').selectOption([{index:0 }]);
    await page.waitForTimeout(2000);



    //2. Check number(count) of options in the dropdown
    const dropDownOptions:Locator = page.locator('#colors>option');
    await expect(dropDownOptions).toHaveCount(7);
    await page.waitForTimeout(2000);

    //3. Check an option present in the dropdowns
    const optionsText:string[] = (await dropDownOptions.allTextContents()).map(text => text.trim());
    //console.log(optionsText);
    expect(optionsText).toContain('White');

    //4. printing options from the drop down
    for(const options of optionsText)
    {
        console.log(options);
    }


})