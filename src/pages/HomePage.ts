import {Page, expect} from "@playwright/test";
import logger from "../utils/LoggerUtils";

export default class HomePage {
    private readonly serviceTitleLocator = "Service";

    constructor(private page : Page) {

    }

    async expectServiceTitleToBeVisible() {
        await expect(this.page.getByTitle(this.serviceTitleLocator)).toBeVisible({timeout: 80000,})
        .catch((error) => {
                logger.error(`Error clicking login button: ${error}`);
                throw error;
            }).then(() => logger.info("Service Title is visible"));
    }

    async navigateToContactTab(){
    await expect(this.page.getByRole('link', { name: this.contactsLinkLocator })).toBeVisible();
    logger.info("Contacts Tab is visible")
    await this.page.getByRole('link', { name: this.contactsLinkLocator }).click();
    logger.info("Contacts Tab is clicked")
    return new ContactPage(this.page);
    
  }
}