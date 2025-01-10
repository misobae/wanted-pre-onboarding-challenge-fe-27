import { getTodoList } from "@/api/todos/todos.api";
import { ROUTER_PATHS } from "@/constants/router-path";
import TodoLayout from "@/layouts/TodoLayout";
import { useQuery } from "@tanstack/react-query";
import { Link, Outlet } from "react-router";
import dayjs from "dayjs";

export default function TodoPage() {
  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodoList,
  });

  return (
    <TodoLayout>
      <div className="grid grid-cols-2 gap-8 mt-8">
        <div className="overflow-y-auto flex flex-col gap-4 max-h-[calc(100dvh-120px)] pb-4">
          {todos?.data.map((todo) => {
            return (
              <Link key={todo.id} to={ROUTER_PATHS.TODO_DETAIL(todo.id)}>
                <div className="flex flex-col gap-1 h-[100px] py-2 px-4 border rounded-lg">
                  <strong>{todo.title}</strong>
                  <p className="mb-auto text-sm text-gray-700 truncate leading-none">
                    {todo.content}
                  </p>
                  <span className="text-sm text-gray-500 text-right">
                    {dayjs(todo.updatedAt).format("YYYY-MM-DD HH:mm")}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <Outlet />
      </div>
    </TodoLayout>
  );
}
