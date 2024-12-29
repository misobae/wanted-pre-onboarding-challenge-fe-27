import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "./layouts/AuthLayout";
import SignIn from "./pages/sign-in";
import SignUp from "./pages/sign-up";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/auth",
        element: <SignIn />,
      },
      {
        path: "/auth/sign-up",
        element: <SignUp />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
