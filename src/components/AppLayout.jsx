import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <main>
      <header>
        <h1>GameHub</h1>
      </header>
      <Navigation />
      <Outlet />
    </main>
  );
}
