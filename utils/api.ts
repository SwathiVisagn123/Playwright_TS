import { APIRequestContext, expect } from "@playwright/test";

export class api {
  readonly apiContext: Promise<APIRequestContext>;

  constructor(apiContext: Promise<APIRequestContext>) {
    this.apiContext = apiContext;
  }
  async wishlist(product: object, endpoint: string) {
    //api request to add wish list
    const response = await (
      await this.apiContext
    ).post(endpoint, {
      data: product,
    });

    //assert api response
    expect(response.ok()).toBeTruthy();
  }
}
