import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";

export function AppLayout() {
  return (
    <>
      <header>
        <h1>GameHub</h1>
      </header>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
