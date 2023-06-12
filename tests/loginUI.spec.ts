import { test, expect } from "@playwright/test";
import { fixture } from "../utils/testbase";
import { loginPage } from "../pageObjects/loginPage";

test.beforeEach(async ({ page }) => {
  //go to opencart
  await page.goto("");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Your Store/);

  // Expects the URL to contain opencart
  await expect(page).toHaveURL(/opencart/);
});

fixture("login through UI", async ({ page, data }) => {
  const login = new loginPage(page);

  //go to Login Page
  await login.goToLogin();

  //enter credentials
  await login.login(data.email, data.password);
});
