import { test, expect } from "@playwright/test";
import { fixture } from "../utils/testbase";
import { homePage } from "../pageObjects/homePage";

test.beforeEach(async ({ page }) => {
  //go to opencart
  await page.goto("");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Your Store/);

  // Expects the URL to contain opencart
  await expect(page).toHaveURL(/opencart/);
});

fixture("update currency in home page", async ({ page, data }) => {
  const home = new homePage(page);

  await home.currencyDropdown.click();

  //choose currency
  await home.dollar.click();

  //assert change of currency
  await expect(home.dollarSymbol).toHaveText(data.dollar_symbol);
});
