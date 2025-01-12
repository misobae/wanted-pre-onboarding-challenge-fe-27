import { updateTodo } from "@/api/todos/todos.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useTodoUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      }),
  });
};
