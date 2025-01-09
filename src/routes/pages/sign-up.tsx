import { postSignUp } from "@/api/users/users.api";
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
import { useToast } from "@/hooks/use-toast";
import AuthLayout from "@/layouts/AuthLayout";
import { signUpSchema } from "@/schemas/sign-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";

export default function SignUpPage() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    mode: "all",
  });

  const mutation = useMutation({
    mutationFn: postSignUp,
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    const { email, password } = values;

    mutation.mutate(
      { email, password },
      {
        onSuccess: (response) => {
          toast({
            title: "회원가입 성공",
            description: response.message,
          });
          navigate(ROUTER_PATHS.SIGNIN);
        },
        onError: (error) => {
          toast({
            title: "회원가입 실패",
            description: error.message ?? "회원가입에 실패했습니다.",
          });
        },
      }
    );
  };

  return (
    <AuthLayout>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">계정을 생성하세요</CardTitle>
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
            <FormField
              control={form.control}
              name="passwordConfirm"
              label="Password Confirm"
              children={(field) => (
                <Input type="password" placeholder="비밀번호 확인" {...field} />
              )}
              hidden
            />
            <Button
              type="submit"
              disabled={!form.formState.isValid}
              className="mt-4"
            >
              회원가입
            </Button>
          </Form>
          <div className="mt-6 text-xs text-center text-gray-500">
            <Link to={ROUTER_PATHS.SIGNIN}>이미 계정이 있으신가요?</Link>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
