import { expect, Locator, Page } from "@playwright/test";

export class homePage {
  readonly page: Page;
  readonly cart_success: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cart_success = page.getByText(
      "Success: You have added iPhone to your shopping cart! ×"
    );
  }
}
