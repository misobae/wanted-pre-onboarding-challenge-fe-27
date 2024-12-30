import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="max-w-[480px] w-11/12">
        <Outlet />
      </div>
    </div>
  );
}
