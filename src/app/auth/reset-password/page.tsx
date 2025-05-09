import ResetPasswordPage from "@/components/reset-password";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading signup...</div>}>
      <ResetPasswordPage />
    </Suspense>
  );
}
