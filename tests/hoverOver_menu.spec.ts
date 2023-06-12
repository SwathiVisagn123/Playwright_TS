import { test, expect } from "@playwright/test";
import { homePage } from "../pageObjects/homePage";

test.beforeEach(async ({ page }) => {
  //go to opencart
  await page.goto("");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Your Store/);

  // Expects the URL to contain opencart
  await expect(page).toHaveURL(/opencart/);

  //
});

test("hover over menu and inner menu selection", async ({ page }) => {
  const home = new homePage(page);
  //wait for page to load
  await page.waitForLoadState("networkidle");

  //hover over menu

  await home.componentsMenu.hover();

  //select menu for Monitors and wait for content to load

  await Promise.all([
    page.waitForSelector("#content"),
    home.innerMenuMonitors.click(),
  ]);

  //confirm menu navigation
  await home.confirmMenuPage();
});
