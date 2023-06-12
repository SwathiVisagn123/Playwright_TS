import { APIRequestContext, expect } from "@playwright/test";

export class api {
  readonly apiContext: Promise<APIRequestContext>;

  constructor(apiContext: Promise<APIRequestContext>) {
    this.apiContext = apiContext;
  }
  async wishlist(productDetails: object, endpointUrl: string) {
    //api request to add wish list
    const response = await (
      await this.apiContext
    ).post(endpointUrl, {
      data: productDetails,
    });

    //assert api response
    expect(response.ok()).toBeTruthy();
  }

  async addToCart(product: object, endpoint: string) {
    const response = await (
      await this.apiContext
    ).post(endpoint, {
      data: product,
    });
  }
}
