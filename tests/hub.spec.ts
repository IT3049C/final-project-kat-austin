import { test, expect } from "@playwright/test";

const PLAYER_NAME = "Bob";

test.describe("Game Hub", () => {
  test("Game Hub Test", async ({ page }) => {
    /* Load landing page */
    await page.goto("/");

    await page.getByRole("heading", { name: "GameHub" }).click();

    /* Verify game list present */
    await expect(
      page.getByRole("link", { name: "Rock Paper Scissors" })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "Tic-Tac-Toe" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Wordle" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Hangman" })).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Memory Cards" })
    ).toBeVisible();

    /* Navigate to every game page and back, along with verifying player name present */
    await page.getByRole("link", { name: "Rock Paper Scissors" }).click();
    await expect(
      page.getByRole("heading", { name: "Rock Paper Scissors" })
    ).toBeVisible();
    await expect(page.getByTestId("greeting")).toContainText(PLAYER_NAME);

    await page.getByRole("link", { name: "Tic-Tac-Toe" }).click();
    await expect(
      page.getByRole("heading", { name: "Tic-Tac-Toe" })
    ).toBeVisible();
    await expect(page.getByTestId("greeting")).toContainText(PLAYER_NAME);

    await page.getByRole("link", { name: "Wordle" }).click();
    await expect(page.getByRole("heading", { name: "Wordle" })).toBeVisible();
    await expect(page.getByTestId("greeting")).toContainText(PLAYER_NAME);

    await page.getByRole("link", { name: "Hangman" }).click();
    await expect(page.getByRole("heading", { name: "Hangman" })).toBeVisible();
    await expect(page.getByTestId("greeting")).toContainText(PLAYER_NAME);

    await page.getByRole("link", { name: "Memory Cards" }).click();
    await expect(
      page.getByRole("heading", { name: "Memory Cards" })
    ).toBeVisible();
    await expect(page.getByTestId("greeting")).toContainText(PLAYER_NAME);
  });
});
