import { expect, request } from "@playwright/test";
import { fixture } from "../utils/testbase";
import { loginPage } from "../pageObjects/loginPage";
import { homePage } from "../pageObjects/homePage";
import { api } from "../utils/api";

fixture.beforeEach(async ({ page, data }) => {
  const login = new loginPage(page);
  const home = new homePage(page);
  //go to opencart
  await page.goto("");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Your Store/);

  // Expects the URL to contain opencart
  await expect(page).toHaveURL(/opencart/);

  //access account menu
  await login.goToLogin();

  //login
  await login.login(process.env.EMAIL, process.env.PASSWORD);

  //navigate to home page
  await home.logo.click();
});

fixture("add wish list item through api", async ({ page, data }) => {
  const home = new homePage(page);

  //create a new context for api requests
  const apiContext = request.newContext();
  const apiUtil = new api(apiContext);

  //wait for page to load
  await page.waitForLoadState("networkidle");

  //add wishlist item thro' API
  //BUG FOUND : WISHLIST API ADDS PRODUCT IN BASKET SOMETIMES OR DOESN'T WORK. INTERMITTENT
  await apiUtil.wishlist(data.wishlistItem, data.wishlist_endpoint);

  //assert UI response
  await home.wishlistIcon.click();

  expect(await home.wishlistProducts.count()).not.toBeNull();
});
