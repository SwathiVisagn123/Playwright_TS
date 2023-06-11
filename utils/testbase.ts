import { test as base } from "@playwright/test";
import testData from "./testData.json";

type MyFixtures = {
  data: typeof testData;
};

export const fixture = base.extend<MyFixtures>({
  data: testData,
});
