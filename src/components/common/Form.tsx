import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";
import { Form as FormUI } from "../ui";

interface FormProps<TFieldValues extends FieldValues> {
  form: UseFormReturn<TFieldValues>;
  onSubmit: SubmitHandler<TFieldValues>;
  children: React.ReactNode;
  className?: string;
  formProps?: React.FormHTMLAttributes<HTMLFormElement>;
}

export default function Form<TFieldValues extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
  formProps,
}: FormProps<TFieldValues>) {
  return (
    <FormUI {...form} {...formProps}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormUI>
  );
}
