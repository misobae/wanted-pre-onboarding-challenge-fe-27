import { Button } from "../ui";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
}

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-1 p-4 border border-red-500 rounded">
      <h2 className="text-lg font-bold text-red-500">에러가 발생했습니다.</h2>
      <p className="text-gray-600">{error.message}</p>
      <Button onClick={resetErrorBoundary} className="mt-4">
        다시 시도
      </Button>
    </div>
  );
}
