import SignupPage from "@/components/signup";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading signup...</div>}>
      <SignupPage />
    </Suspense>
  );
}
