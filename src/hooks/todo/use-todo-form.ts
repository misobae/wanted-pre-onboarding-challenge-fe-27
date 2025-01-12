import { todoSchema } from "@/schemas/todo-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

interface UseTodoFormProps {
  initialValues?: {
    title?: string;
    content?: string;
  };
  mode?: "onSubmit" | "onChange" | "onBlur";
}

export const useTodoForm = ({
  initialValues,
  mode = "onSubmit",
}: UseTodoFormProps = {}) => {
  return useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    mode,
    defaultValues: {
      title: initialValues?.title ?? "",
      content: initialValues?.content ?? "",
    },
  });
};
