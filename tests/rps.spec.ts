import { test, expect } from "@playwright/test";

test.describe("Rock Paper Scissors", () => {
  test("Rock Paper Scissors Test", async ({ page }) => {
    /* Loading initial game state */
    await page.goto("/game/rps");

    await expect(
      page.getByRole("heading", { name: "Rock Paper Scissors" })
    ).toBeVisible();
    await expect(page.getByText("Player:").getByRole("strong")).toContainText(
      "0"
    );
    await expect(page.getByText("CPU:").getByRole("strong")).toContainText("0");
    await expect(page.getByText("Ties:").getByRole("strong")).toContainText(
      "0"
    );

    /* Testing components can be interacted with */
    await page.getByRole("button", { name: "Rock" }).click();
    await page.getByRole("button", { name: "Paper" }).click();
    await page.getByRole("button", { name: "Scissors" }).click();
    await expect(page.getByRole('listitem')).toHaveCount(3);

    /* Resetting game to initial state */
    await page.getByRole("button", { name: "Reset Game" }).click();
    await expect(page.getByText("Player:").getByRole("strong")).toContainText(
      "0"
    );
    await expect(page.getByText("CPU:").getByRole("strong")).toContainText("0");
    await expect(page.getByText("Ties:").getByRole("strong")).toContainText(
      "0"
    );
  });
});
