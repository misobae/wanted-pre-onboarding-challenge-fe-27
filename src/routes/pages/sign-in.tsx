import { postSignIn } from "@/api/users/users.api";
import { Form, FormField } from "@/components/common";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
} from "@/components/ui";
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
          <Form form={form} className="flex flex-col gap-2" onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="email"
              label="Email"
              children={(field) => (
                <Input type="email" placeholder="이메일" {...field} />
              )}
              hidden
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              children={(field) => (
                <Input type="password" placeholder="비밀번호" {...field} />
              )}
              hidden
            />
            <Button
              type="submit"
              disabled={!form.formState.isValid}
              className="mt-4"
            >
              로그인
            </Button>
          </Form>
          <div className="mt-6 text-xs text-center text-gray-500">
            <Link to={ROUTER_PATHS.SIGNUP}>아직 가입하지 않으셨나요?</Link>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
