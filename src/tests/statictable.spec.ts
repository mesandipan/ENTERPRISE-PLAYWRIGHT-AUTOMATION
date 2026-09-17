import {test, Locator, expect} from "@playwright/test";

test('Static web table', async({page}) => {

    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.waitForTimeout(5000);

    const table:Locator = page.locator("table[name='BookTable'] tbody");
    await expect(table).toBeVisible();

    //1) Count number of rows in a table
    const rows:Locator = table.locator("tr");   // Chaining of locator

    // Approach 1
    await expect(rows).toHaveCount(7);

    const rowCount:number = await rows.count();
    console.log("Number of rows in a table: ", rowCount);

    // Approach 2
    expect(rowCount).toBe(7);


    //2) Count number of headers/columns
    const col:Locator =rows.locator("th");
    await expect(col).toHaveCount(4);

    const colCount:number = await col.count();
    console.log("Number of rows in a table: ", colCount);
    expect(colCount).toBe(4);
 

    //3)Read all data from 2nd row (Index 2 means 3rd row including header)
    const secondRowCells:Locator = rows.nth(2).locator('td');
    const secondRowText:string[] = await secondRowCells.allInnerTexts();
    console.log("Second Row Data: ", secondRowText);
    await expect(secondRowCells).toHaveText([ 'Learn Java', 'Mukesh', 'Java', '500' ]);


    //4) Read all data from the table(excluding header)

    const allRowData = await rows.all();    //get all row locators. all() returns array of locators.
    for(let row of allRowData.slice(1))     //slice(1) will skip the header
    {
        const cols = await row.locator('td').allInnerTexts();
        console.log(cols.join('\t'));
    }



    //5) Print the book name where author is Mukesh
    const mukeshBooks:string[] = [];
    console.log("Books written by Mukesh");
    for(let row of allRowData.slice(1))     //slice(1) will skip the header
    {
        const cells = await row.locator('td').allInnerTexts();
        const book=cells[0];
        const authorName = cells[1];
        if(authorName === 'Mukesh')
        {
            console.log(`${authorName} \t ${book}`);
            mukeshBooks.push(book);

        }
        expect(mukeshBooks).toHaveLength(2);

    }




})