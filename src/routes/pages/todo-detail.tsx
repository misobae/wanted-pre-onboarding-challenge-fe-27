import { getTodoById } from "@/api/todos/todos.api";
import { TodoForm } from "@/components/feature";
import { Button } from "@/components/ui";
import { ROUTER_PATHS } from "@/constants/router-path";
import {
  useToast,
  useTodoDeleteMutation,
  useTodoForm,
  useTodoUpdateMutation,
} from "@/hooks";
import { todoSchema } from "@/schemas/todo-schema";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { z } from "zod";

export default function TodoDetailPage() {
  const { todoId } = useParams() as { todoId: string };
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useTodoForm();
  const updateMutation = useTodoUpdateMutation();
  const deleteMutation = useTodoDeleteMutation();

  const { data: todo, isSuccess } = useQuery({
    queryKey: ["todo", todoId],
    queryFn: () => getTodoById(todoId),
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
        form.reset();
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
