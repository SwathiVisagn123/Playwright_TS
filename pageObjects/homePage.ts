import { expect, Locator, Page } from "@playwright/test";

export class homePage {
  readonly page: Page;
  readonly cart_success: Locator;
  readonly componentsMenu: Locator;
  readonly innerMenuMonitors: Locator;
  readonly content: Locator;
  readonly confirmHeading: Locator;
  readonly logo: Locator;
  readonly wishlistIcon: Locator;
  readonly wishlistProducts: Locator;
  readonly cartIcon: Locator;
  readonly currencyDropdown: Locator;
  readonly dollar: Locator;
  readonly dollarSymbol: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cart_success = page.getByText(
      "Success: You have added iPhone to your shopping cart! ×"
    );
    this.componentsMenu = page.getByRole("link", { name: "Components" });
    this.innerMenuMonitors = page.getByRole("link", { name: "Monitors (2)" });
    this.logo = page.getByAltText("naveenopencart");
    this.wishlistIcon = page.getByRole("link", { name: / Wish List/ });
    this.wishlistProducts = page.locator("tbody tr");
    this.cartIcon = page.getByRole("link", { name: " Shopping Cart" });
    this.currencyDropdown = page.getByRole("button", { name: "$ Currency " });
    this.dollar = page.getByRole("button", { name: "$ US Dollar" });
    this.dollarSymbol = page.locator("strong");
  }

  async confirmMenuPage() {
    await expect(this.page.locator("h2")).toContainText("Monitors");
  }
}
