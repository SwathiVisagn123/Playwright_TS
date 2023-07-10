import { expect, Locator, Page } from "@playwright/test";

export class loginPage {
  readonly page: Page;
  readonly accountMenu: Locator;
  readonly loginMenu: Locator;
  readonly returningCust: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly submit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountMenu = page.locator(".list-inline .dropdown");
    this.loginMenu = page.getByRole("link", { name: "Login" });
    this.returningCust = page.locator('text="Returning Customer"');
    this.email = page.getByPlaceholder("E-Mail Address");
    this.password = page.getByPlaceholder("Password");
    this.submit = page.locator('input[type="submit"]');
  }

  async goToLogin() {
    await this.page.waitForLoadState("networkidle");
    await this.accountMenu.click();
    await this.loginMenu.click();
    await expect(this.page).toHaveURL(/login/);
    await expect(this.returningCust).toBeVisible();
  }

  async login(email, password) {
    await this.email.type(email);
    await this.password.type(password);
    await this.submit.click();
  }
}
