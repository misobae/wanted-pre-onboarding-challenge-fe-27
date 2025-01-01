import { HTMLAttributes } from "react";

export default function AuthLayout({
  children,
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="max-w-[480px] w-11/12">{children}</div>
    </div>
  );
}
