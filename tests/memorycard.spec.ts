import { test, expect } from "@playwright/test";
import { config } from "../src/logic/memoryCards";

const CARD_AMOUNT = config.rows * config.columns;

test.describe("Memory Cards", () => {
  test("Memory Cards Test", async ({ page }) => {
    /* Loading initial game state */
    await page.goto("/game/memory-cards");

    await expect(page.getByRole("heading", { name: "Memory Cards" })).toBeVisible();

    const cards = page.getByTestId("memory-card-button");

    await expect(cards).toHaveCount(CARD_AMOUNT);

    for (const card of await cards.all()) {
      await expect(card).toHaveText("");
    }

    /* Testing components can be interacted with */
    const card1 = page.getByTestId("memory-card-button").first();
    const card2 = page.getByTestId("memory-card-button").nth(1);
    await card1.click();
    await card2.click();
    await expect(card1).not.toHaveText("")
    await expect(card2).not.toHaveText("")

    /* Resetting game to initial state */
    await page.reload();

    await expect(cards).toHaveCount(CARD_AMOUNT);

    for (const card of await cards.all()) {
      await expect(card).toHaveText("");
    }
  });
});
