import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { HomePage } from "./pages/HomePage.jsx";
import { RPSGamePage } from "./pages/RPSGamePage.jsx";
import { TicTacToePage } from "./pages/TicTacToePage.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/game/rps", element: <RPSGamePage /> },
      { path: "/game/tic-tac-toe", element: <TicTacToePage /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
