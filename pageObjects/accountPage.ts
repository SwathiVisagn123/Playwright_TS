import { expect, Locator, Page } from "@playwright/test";

export class accountPage {
  readonly page: Page;
  readonly newsletterHeading: Locator;
  readonly subscription: Locator;
  readonly yesRadio: Locator;
  readonly noRadio: Locator;
  readonly continueBtn: Locator;
  readonly successAlert: Locator;
  readonly accountBreadcrumb: Locator;
  readonly accountPage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newsletterHeading = page.getByRole("heading", { name: "Newsletter" });
    this.subscription = page.getByRole("link", {
      name: "Subscribe / unsubscribe to newsletter",
    });
    this.yesRadio = page.getByLabel("Yes");
    this.noRadio = page.getByLabel("No");
    this.continueBtn = page.locator('input[type="submit"]');
    this.successAlert = page.locator(".alert.alert-success.alert-dismissible");
    this.accountBreadcrumb = page.locator(".breadcrumb li", {
      hasText: "Account",
    });
    this.accountPage = page
      .locator("#content")
      .getByRole("heading", { name: "My Account" });
  }

  async changeSubscription() {
    if (await this.yesRadio.isChecked()) {
      await this.noRadio.check();
      await this.continueBtn.click();
      await expect(this.successAlert).toBeVisible();

      //assert if no is checked
      await this.accountBreadcrumb.click();
      await this.page.waitForLoadState("domcontentloaded");

      this.subscription.click();
      await this.page.waitForLoadState("domcontentloaded");
      expect(await this.noRadio.isChecked()).toBeTruthy();
    } else {
      await this.yesRadio.check();
      await this.continueBtn.click();
      await expect(this.successAlert).toBeVisible();

      //assert if Yes is checked
      await this.accountBreadcrumb.click();
      await this.page.waitForLoadState("domcontentloaded");

      await this.subscription.click();
      await this.page.waitForLoadState("domcontentloaded");
      expect(await this.yesRadio.isChecked()).toBeTruthy();
    }
  }
}
