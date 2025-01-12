import { deleteTodo } from "@/api/todos/todos.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useTodoDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
};
