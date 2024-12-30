import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SignUp() {
  const signUpSchema = z
    .object({
      email: z
        .string()
        .min(1, { message: "이메일을 입력해 주세요." })
        .email({ message: "이메일 형식이 올바르지 않습니다." }),
      password: z
        .string()
        .min(8, { message: "비밀번호는 8자 이상이어야 합니다." }),
      passwordConfirm: z.string(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "비밀번호가 일치하지 않습니다.",
      path: ["passwordConfirm"],
    });

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    mode: "onChange",
  });

  const onSubmit = (values: z.infer<typeof signUpSchema>) => {
    console.log("onSubmit", values);
  };

  useEffect(() => {
    console.log(form.formState.isValid);
  }, [form]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-center">Creacte Account</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel hidden>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel hidden>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel hidden>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={!form.formState.isValid}
              className="mt-4"
            >
              Sign up
            </Button>
            {/* 이베일, 비밀번호가 모두 입력되어 있고, 조건 만족 시 버튼 활성화 */}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
