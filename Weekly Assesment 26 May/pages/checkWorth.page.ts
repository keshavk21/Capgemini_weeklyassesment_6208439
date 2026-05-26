import { Page, Locator } from "@playwright/test";
import fs from "fs";

const data = JSON.parse(
  fs.readFileSync("./test-data/PropertyWorth.json", "utf-8"),
);

class CheckWorth {
  page: Page;
  locationIf: Locator;
  getEstimateBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.locationIf = this.page.locator(
      '//input[@class="auto-suggest__input prop-worth__input"]',
    );

    this.getEstimateBtn = this.page.getByText("Get Estimate");
  }

  async getWorth() {
    await this.locationIf.fill(`${data.location}`);
    await this.getEstimateBtn.click();
  }

  async fillDetails() {
    await this.page
      .getByPlaceholder("Enter Project/Locality")
      .fill(`${data.location}`);

    await this.page
      .locator('//div[@class="auto-suggest__drop-down__item"]')
      .first()
      .click();

    await this.page.getByText(`${data.type}`).click();

    await this.page.getByText(`${data.bhk}`).click();

    await this.page
      .locator('//input[@class="search-filter__super-area__input"]')
      .fill(`${data.area}`);

    await this.page
      .locator('//select[@class="search-filter__super-area__select"]')
      .selectOption({
        label: `${data.floors}`,
      });

    await this.page
      .locator('//input[@class="search-filter__totalfloor"]')
      .fill(`${data.totalFloor}`);

    await this.page.getByText(`${data.interior}`).click();

    await this.getEstimateBtn.click();

    await this.page.screenshot();
  }
}

export default CheckWorth;
