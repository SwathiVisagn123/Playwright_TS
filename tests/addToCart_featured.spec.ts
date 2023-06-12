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

fixture("add to cart from featured", async ({ page, data }) => {
  const home = new homePage(page);
  //wait for page to load
  await page.waitForLoadState("networkidle");

  //fetch all products under featured section
  const featured: string[] = await page
    .locator(".caption > h4")
    .allInnerTexts();

  //get the count of featured products
  const count: number = await page.locator(".caption > h4").count();

  //iterate and click on the particluar product
  for (let i = 0; i <= count; i++) {
    if (
      (await page.locator(".caption > h4").nth(i).textContent()) ===
      data.featured
    ) {
      await page
        .locator(".button-group")
        .nth(i)
        .getByRole("button")
        .nth(0)
        .click();
      break;
    }
  }
  //validate the success message
  await expect(home.cart_success).toBeVisible();
});
