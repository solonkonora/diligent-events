import { AdminDashboard } from "@/components/admin-dashboard";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <AdminDashboard />
    </Suspense>
  );
}
