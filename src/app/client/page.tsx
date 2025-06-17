// import BookingPage from "@/components/booking-form";
// import React from "react";

// const Bookings = () => {
//   return (
//     <div>
//       <BookingPage />
//     </div>
//   );
// };

// export default Bookings;

// Bookings will be a tab in this dashboard

import { ClientDashboard } from "@/components/client-dashboard";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <ClientDashboard />
    </Suspense>
  );
}
