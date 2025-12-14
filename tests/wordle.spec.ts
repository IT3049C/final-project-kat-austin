import { test, expect } from "@playwright/test";
import { config } from "../src/logic/wordle";

const LETTER_COUNT = config.wordLength * config.attemptNum;
const WORD = "ghost";

test.describe("Wordle", () => {
  test.beforeEach(async ({ page }) => {
    await page.route(
      "https://random-word-api.herokuapp.com/word*",
      async (route) => {
        await route.fulfill({
          status: 200,
          body: JSON.stringify([WORD]),
        });
      }
    );
  });

  test("Wordle Test", async ({ page }) => {
    /* Loading initial game state */
    await page.goto("/game/wordle");

    await expect(page.getByRole("heading", { name: "Wordle" })).toBeVisible();

    const cells = page.getByTestId("wordle-letter");

    // Check for correct number of squares
    await expect(cells).toHaveCount(LETTER_COUNT);
    // Make sure cells empty
    for (const cell of await cells.all()) {
      await expect(cell).toHaveText("");
    }

    /* Testing components can be interacted with */
    await page.keyboard.type(WORD);
    await page.keyboard.press("Enter");

    for (let i = 0; i < config.wordLength; i++) {
      await expect((await cells.all())[i]).toHaveText(WORD[i]);
    }

    await expect(page.getByText("You Win!")).toBeVisible();

    /* Check page resets to initial state */
    await page.reload();

    await expect(cells).toHaveCount(LETTER_COUNT);
    for (const cell of await cells.all()) {
      await expect(cell).toHaveText("");
    }
  });
});
