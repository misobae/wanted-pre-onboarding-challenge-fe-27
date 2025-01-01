import { ROUTER_PATHS } from "@/constants/router-path";
import { useAuthContext } from "@/context/auth-context";
import { Navigate, Outlet } from "react-router";

export const PrivateGuard = () => {
  const { isLoggedIn } = useAuthContext();

  if (!isLoggedIn) {
    return <Navigate to={ROUTER_PATHS.SIGNIN} />;
  }

  return <Outlet />;
};
