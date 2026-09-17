import {test, expect, Locator} from "@playwright/test";

test('Xpath Access Demo', async({page}) => {

    await page.goto("https://www.w3schools.com/html/html_tables.asp");

    //1. self access - select <td> element that contains "Germany"
    const countryGermanyCell:Locator=page.locator("//td[text()='Germany']/self::td");
    await expect(countryGermanyCell).toHaveText('Germany');

    
    //2. parent access - Get parent <tr> of the 'Germany' cell
    const parentRow=page.locator("//td[text()='Germany']/parent::tr");
    await expect(parentRow).toContainText("Alfreds Futterkiste");
    console.log(await parentRow.textContent());


    //3. child access - Get all <td> children of the second <tr> in the table
    const secondRowCells:Locator=page.locator("//table[@id='customers']//tr[3]/child::td");
    await expect(secondRowCells).toHaveCount(3);


    //4. ancestor access - Get ancestor <table> of the 'Germany' cell. Ancestor means parent and grand parents
    const table:Locator=page.locator("//td[text()='Germany']/ancestor::table");
    await expect(table).toHaveAttribute('id','customers');


    //5. descendant axis - Get all descendant <td> elements of the table. descendant means child, grand child and so on.
    const allTds:Locator = page.locator("//table[@id='customers']/descendant::td");
    await expect(allTds).toHaveCount(18);

    //6. following axes - Get the next sibling <td> of the 'Germany' cell
    const nextSibling:Locator=page.locator("//td[text()='Germany']/following::td[1]");
    await expect(nextSibling).toHaveText('Maria Anders');

    //7. following-sibling axes - Get all the next sibling <td> of the second row
    const followingSiblings:Locator=page.locator("//td[text()='Germany']/following-sibling::td");
    await expect(followingSiblings).toHaveCount(0);

    
});