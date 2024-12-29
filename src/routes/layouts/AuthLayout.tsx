import { Outlet, ScrollRestoration } from "react-router";

export default function AuthLayout() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
}
