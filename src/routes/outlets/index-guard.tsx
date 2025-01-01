import { ROUTER_PATHS } from "@/constants/router-path";
import { useAuthContext } from "@/context/auth-context";
import { Navigate } from "react-router";

export const IndexGuard = () => {
  const { isLoggedIn } = useAuthContext();

  if (isLoggedIn) {
    return <Navigate to={ROUTER_PATHS.TODO} />;
  } else {
    return <Navigate to={ROUTER_PATHS.SIGNIN} />;
  }
};
