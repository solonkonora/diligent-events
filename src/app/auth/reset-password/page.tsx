import ResetPasswordPage from "@/components/reset-password";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading ResetPasswordPage...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
