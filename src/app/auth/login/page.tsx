import LoginPage from "@/components/login";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading login...</div>}>
      <LoginPage />
    </Suspense>
  );
}
