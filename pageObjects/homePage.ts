import { expect, Locator, Page } from "@playwright/test";

export class homePage {
  readonly page: Page;
  readonly cart_success: Locator;
  readonly componentsMenu: Locator;
  readonly innerMenuMonitors: Locator;
  readonly content: Locator;
  readonly confirmHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cart_success = page.getByText(
      "Success: You have added iPhone to your shopping cart! ×"
    );
    this.componentsMenu = page.getByRole("link", { name: "Components" });
    this.innerMenuMonitors = page.getByRole("link", { name: "Monitors (2)" });
  }

  async confirmMenuPage() {
    await expect(this.page.locator("h2")).toContainText("Monitors");
  }
}
