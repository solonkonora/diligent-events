import LandingPage from "@/components/home";

export default function Home() {
  return <LandingPage />;
}

// // Uncomment the following code to test Supabase connection in the browser console
// "use client";
// import { useEffect } from "react";
// import { supabase } from "@/lib/supabaseClient";

// export default function Home() {
//   useEffect(() => {
//     const testConnection = async () => {
//       const { data, error } = await supabase.from("profiles").select("*");
//       if (error) {
//         console.error("❌ Supabase error:", error);
//       } else {
//         console.log("✅ Supabase connected. Data:", data);
//       }
//     };

//     testConnection();
//   }, []);

//   return <div>Check the browser console for Supabase connection result</div>;
// }
