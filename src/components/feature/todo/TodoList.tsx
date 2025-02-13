import { getTodoList } from "@/api/todos/todos.api";
import { ROUTER_PATHS } from "@/constants/router-path";
import { useSuspenseQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Link } from "react-router";

export default function TodoList() {
  const { data: todos } = useSuspenseQuery({
    queryKey: ["todos"],
    queryFn: getTodoList,
  });

  return (
    <div className="overflow-y-auto flex flex-col gap-4 max-h-[calc(100dvh-120px)] pb-4">
      {todos?.data.length === 0 ? (
        <div className="flex justify-center items-center h-[100px] border rounded-lg bg-gray-50">
          <p className="text-gray-700">할 일이 없습니다.</p>
        </div>
      ) : (
        todos?.data.map((todo) => {
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
        })
      )}
    </div>
  );
}
