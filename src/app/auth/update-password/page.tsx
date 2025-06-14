import UpdatePasswordPage from "@/components/update-password";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading signup...</div>}>
      <UpdatePasswordPage />
    </Suspense>
  );
}
