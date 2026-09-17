import {test,expect,Locator} from "@playwright/test";

test('Verify Drop Down is sorted', async({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/", {
        waitUntil:"load",
        timeout: 60000
    }); 

    const dropDownOptions:Locator = page.locator('#colors>option');
    const optionsText:string[]=(await dropDownOptions.allTextContents()).map(text => text.trim());

    //(...)3 dots are called spread operator
    const originalList:string[] = [...optionsText];
    const sortedList:string[] = [...optionsText].sort();

    console.log("Original List: ", originalList);
    console.log("Sorted List: ", sortedList);

    expect(originalList).toEqual(sortedList);

    await page.waitForTimeout(3000);

    

})