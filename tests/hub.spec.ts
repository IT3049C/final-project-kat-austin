import { test, expect } from "@playwright/test";

const PLAYER_NAME = "Bob";

test.describe("Game Hub", () => {
  test("Game Hub Test", async ({ page }) => {
    /* Load landing page */
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "GameHub", exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Welcome to GameHub" })
    ).toBeVisible();

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

    /* Capture player name */
    await page.getByRole("textbox", { name: "Your Name:" }).fill(PLAYER_NAME);
    await page.getByRole("button", { name: "Save Name" }).click();
    await expect(page.getByText(`Current name: ${PLAYER_NAME}`)).toBeVisible();
    await expect(page.getByRole("strong")).toContainText(PLAYER_NAME);

    /* Navigate to every game page and back, along with verifying player name present */
    // Rock Paper Scissors
    await page.getByRole("link", { name: "Rock Paper Scissors" }).click();
    await expect(
      page.getByRole("heading", { name: "Rock Paper Scissors" })
    ).toBeVisible();
    await expect(page.getByTestId("greeting")).toContainText(PLAYER_NAME);

    // Tic-tac-toe
    await page.getByRole("link", { name: "Tic-Tac-Toe" }).click();
    await expect(
      page.getByRole("heading", { name: "Tic-Tac-Toe" })
    ).toBeVisible();
    await expect(page.getByTestId("greeting")).toContainText(PLAYER_NAME);

    // Wordle
    await page.getByRole("link", { name: "Wordle" }).click();
    await expect(page.getByRole("heading", { name: "Wordle" })).toBeVisible();
    await expect(page.getByTestId("greeting")).toContainText(PLAYER_NAME);

    // Hangman
    await page.getByRole("link", { name: "Hangman" }).click();
    await expect(page.getByRole("heading", { name: "Hangman" })).toBeVisible();
    await expect(page.getByTestId("greeting")).toContainText(PLAYER_NAME);

    // Memory Cards
    await page.getByRole("link", { name: "Memory Cards" }).click();
    await expect(
      page.getByRole("heading", { name: "Memory Cards" })
    ).toBeVisible();
    await expect(page.getByTestId("greeting")).toContainText(PLAYER_NAME);
  });
});
