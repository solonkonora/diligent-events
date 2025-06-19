import LogoutPage from "@/components/logout";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Logging out...</div>}>
      <LogoutPage />
    </Suspense>
  );
}
