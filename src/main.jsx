import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { HomePage } from "./pages/HomePage.jsx";
import { RPSGamePage } from "./pages/RPSGamePage.jsx";
import { TicTacToePage } from "./pages/TicTacToePage.jsx";
import { WordlePage } from "./pages/WordlePage.jsx";
import { HangmanPage } from "./pages/HangmanPage.jsx";
import { MemoryCardsPage } from "./pages/MemoryCardsPage.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppLayout } from "./components/AppLayout.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout/>,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/game/rps", element: <RPSGamePage /> },
      { path: "/game/tic-tac-toe", element: <TicTacToePage /> },
      { path: "/game/wordle", element: <WordlePage /> },
      { path: "/game/hangman", element: <HangmanPage /> },
      { path: "/game/memory-cards", element: <MemoryCardsPage /> },
    ],
  },
], {
  basename: import.meta.env.BASE_URL,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
