import {
  Control,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";
import {
  FormControl,
  FormField as FormFieldUI,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui";

interface FormFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  children: (
    field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>
  ) => React.ReactNode;
  hidden?: boolean;
}

export default function FormField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  children,
  hidden,
}: FormFieldProps<TFieldValues>) {
  return (
    <FormFieldUI
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel hidden={hidden}>{label}</FormLabel>
          <FormControl>{children(field)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
