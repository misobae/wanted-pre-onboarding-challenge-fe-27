import { deleteTodo, getTodoById, updateTodo } from "@/api/todos/todos.api";
import { TodoForm } from "@/components/feature";
import { Button } from "@/components/ui";
import { ROUTER_PATHS } from "@/constants/router-path";
import { useToast } from "@/hooks/use-toast";
import { todoSchema } from "@/schemas/todo-schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { z } from "zod";

export default function TodoDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const todoId = location.pathname.split("/")[2];
  const { toast } = useToast();
  const { data: todo, isSuccess } = useQuery({
    queryKey: ["todo", todoId],
    queryFn: () => getTodoById(todoId),
  });

  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });

      form.reset({ title: "", content: "" });
    },
  });

  const form = useForm<z.infer<typeof todoSchema>>({
    defaultValues: {},
  });

  useEffect(() => {
    if (isSuccess && todo?.data) {
      form.reset(todo.data);
    }
  }, [isSuccess, todo?.data, form]);

  const handleUpdate = (values: z.infer<typeof todoSchema>) => {
    updateMutation.mutate(
      { todoId, ...values },
      {
        onSuccess: () => {
          toast({
            title: "할 일 수정",
            description: "할 일을 수정했습니다.",
          });
        },
      }
    );
  };

  const handleDelete = () => {
    deleteMutation.mutate(todoId, {
      onSuccess: () => {
        toast({
          title: "할 일 삭제",
          description: "할 일을 삭제했습니다.",
        });
        navigate(ROUTER_PATHS.TODO);
      },
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <Link
        to={ROUTER_PATHS.TODO}
        className="size-8 ml-auto bg-black rounded-lg text-white text-center text-xl leading-8"
      >
        +
      </Link>
      <TodoForm form={form} onSubmit={handleUpdate}>
        <div className="flex gap-2">
          <Button type="submit" className="grow">
            수정
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            variant={"secondary"}
            className="grow border"
          >
            삭제
          </Button>
        </div>
      </TodoForm>
    </div>
  );
}
