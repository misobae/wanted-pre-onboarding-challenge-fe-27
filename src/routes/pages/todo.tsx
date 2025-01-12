import { getTodoList } from "@/api/todos/todos.api";
import TodoForm from "@/components/feature/todo/TodoForm";
import { Button } from "@/components/ui";
import { ROUTER_PATHS } from "@/constants/router-path";
import TodoLayout from "@/layouts/TodoLayout";
import { todoSchema } from "@/schemas/todo-schema";
import { useQuery } from "@tanstack/react-query";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { z } from "zod";
import dayjs from "dayjs";
import { useTodoCreateMutation, useToast, useTodoForm } from "@/hooks";

export default function TodoPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const form = useTodoForm();
  const createMutation = useTodoCreateMutation();

  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodoList,
  });

  const handleSubmit = async (values: z.infer<typeof todoSchema>) => {
    createMutation.mutate(values, {
      onSuccess: (response) => {
        toast({
          title: "할 일 등록",
          description: "할 일을 등록했습니다.",
        });
        form.reset();
        navigate(ROUTER_PATHS.TODO_DETAIL(response.data.id));
      },
      onError: (error) => {
        toast({
          title: "할 일 등록",
          description: error.message ?? "할 일 등록에 실패했습니다.",
        });
      },
    });
  };

  return (
    <TodoLayout>
      <div className="grid grid-cols-2 gap-8 mt-8">
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
        {location.pathname === "/todo" && (
          <TodoForm form={form} onSubmit={handleSubmit}>
            <Button>등록</Button>
          </TodoForm>
        )}
        <Outlet />
      </div>
    </TodoLayout>
  );
}
