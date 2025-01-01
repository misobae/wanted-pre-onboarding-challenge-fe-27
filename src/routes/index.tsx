import { createBrowserRouter, RouterProvider } from "react-router";
import { PublicGuard } from "./outlets/public-guard";
import { ROUTER_PATHS } from "@/constants/router-path";
import { IndexGuard } from "./outlets/index-guard";
import SignInPage from "./pages/sign-in";
import SignUpPage from "./pages/sign-up";
import { PrivateGuard } from "./outlets/private-guard";
import TodoPage from "./pages/todo";

const router = createBrowserRouter([
  {
    path: ROUTER_PATHS.INDEX,
    element: <IndexGuard />,
  },
  {
    element: <PublicGuard />,
    children: [
      {
        path: ROUTER_PATHS.SIGNIN,
        element: <SignInPage />,
      },
      {
        path: ROUTER_PATHS.SIGNUP,
        element: <SignUpPage />,
      },
    ],
  },
  {
    element: <PrivateGuard />,
    children: [
      {
        path: ROUTER_PATHS.TODO,
        element: <TodoPage />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
