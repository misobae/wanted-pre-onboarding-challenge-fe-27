import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/auth-context";
import { useToast } from "@/hooks/ui/use-toast";
import { HTMLAttributes } from "react";

export default function TodoLayout({
  children,
}: HTMLAttributes<HTMLDivElement>) {
  const { logout } = useAuthContext();
  const { toast } = useToast();

  const handleClickLogout = () => {
    logout();
    toast({
      title: "로그아웃 성공",
      description: "로그아웃 되었습니다.",
    });
  };

  return (
    <main>
      <header className="border-grid sticky top-0 z-50 w-full py-2 bg-white border-b">
        <div className="common-wrapper flex justify-between items-center">
          <h1 className="text-xl font-bold">할 일</h1>
          <Button onClick={handleClickLogout} size={"sm"}>
            로그아웃
          </Button>
        </div>
      </header>
      <section className="common-wrapper">{children}</section>
    </main>
  );
}
