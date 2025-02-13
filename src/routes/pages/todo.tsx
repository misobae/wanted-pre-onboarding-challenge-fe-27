import TodoForm from "@/components/feature/todo/TodoForm";
import { Button } from "@/components/ui";
import { ROUTER_PATHS } from "@/constants/router-path";
import TodoLayout from "@/layouts/TodoLayout";
import { todoSchema } from "@/schemas/todo-schema";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { Outlet, useLocation, useNavigate } from "react-router";
import { z } from "zod";
import { useTodoCreateMutation, useToast, useTodoForm } from "@/hooks";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { TodoList } from "@/components/feature";
import { ErrorFallback } from "@/components/common";

export default function TodoPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const form = useTodoForm();
  const createMutation = useTodoCreateMutation();

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
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
              <Suspense fallback={<div>로딩 중...</div>}>
                <TodoList />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>

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
