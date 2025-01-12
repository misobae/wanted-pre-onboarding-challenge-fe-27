import { postTodo } from "@/api/todos/todos.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useTodoCreateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
};
