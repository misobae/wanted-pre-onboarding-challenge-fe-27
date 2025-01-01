import { postSignIn } from "@/api/users/users.api";
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
import { ROUTER_PATHS } from "@/constants/router-path";
import { useAuthContext } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import AuthLayout from "@/layouts/AuthLayout";
import { signInSchema } from "@/schemas/sign-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";

export default function SignInPage() {
  const { login } = useAuthContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    mode: "all",
  });

  const mutation = useMutation({
    mutationFn: postSignIn,
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    mutation.mutate(values, {
      onSuccess: (response) => {
        login(response.token);
        toast({
          title: "로그인 성공",
          description: response.message,
        });
        navigate(ROUTER_PATHS.TODO);
      },
      onError: (error) => {
        toast({
          title: "로그인 실패",
          description: error.message ?? "로그인에 실패했습니다.",
        });
      },
    });
  };

  return (
    <AuthLayout>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">안녕하세요?</CardTitle>
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
                      <Input type="email" placeholder="이메일" {...field} />
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
                      <Input
                        type="password"
                        placeholder="비밀번호"
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
                로그인
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-xs text-center text-gray-500">
            <Link to={ROUTER_PATHS.SIGNUP}>아직 가입하지 않으셨나요?</Link>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
