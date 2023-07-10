import { expect } from "@playwright/test";
import { fixture } from "../utils/testbase";
import { loginPage } from "../pageObjects/loginPage";
import { homePage } from "../pageObjects/homePage";
import { accountPage } from "../pageObjects/accountPage";

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
});

fixture("Cancel or Add newsletter subscription", async ({ page, data }) => {
  const account = new accountPage(page);
  //wait for page to load
  await page.waitForLoadState("networkidle");

  //assert account page url
  await expect(page).toHaveURL(/account/);

  //click newsletter menu
  expect(await account.newsletterHeading.isHidden()).toBeFalsy();

  await account.subscription.click();

  //assert newsletter page
  await page.waitForURL(/newsletter/);
  await expect(page).toHaveURL(/newsletter/);

  //change the subscription option

  await account.changeSubscription();
});
