import { Form, FormField } from "@/components/common";
import { FormProps } from "@/components/common/Form";
import { Input, Textarea } from "@/components/ui";
import { todoSchema } from "@/schemas/todo-schema";
import { z } from "zod";

interface TodoFormProps extends FormProps<z.infer<typeof todoSchema>> {
  disabled?: boolean;
}

export default function TodoForm({
  form,
  onSubmit,
  disabled,
  children,
  ...props
}: TodoFormProps) {
  return (
    <Form
      className="flex flex-col gap-2"
      form={form}
      onSubmit={onSubmit}
      {...props}
    >
      <FormField
        control={form.control}
        name="title"
        label="Title"
        children={(field) => (
          <Input
            type="text"
            placeholder="제목"
            disabled={disabled}
            {...field}
          />
        )}
        hidden
      />
      <FormField
        control={form.control}
        name="content"
        label="content"
        children={(field) => (
          <Textarea
            className="h-[300px] resize-none"
            placeholder="내용"
            disabled={disabled}
            {...field}
          />
        )}
        hidden
      />
      {children}
    </Form>
  );
}
