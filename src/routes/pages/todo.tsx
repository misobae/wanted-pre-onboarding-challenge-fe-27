import TodoLayout from "@/layouts/TodoLayout";
import { Outlet } from "react-router";

export default function TodoPage() {
  return (
    <TodoLayout>
      <div className="flex">
        List
        <Outlet />
      </div>
    </TodoLayout>
  );
}
