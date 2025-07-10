// /// <reference types="https://deno.land/std@0.177.0/types.d.ts" />
// import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers":
//     "authorization, x-client-info, apikey, content-type",
// };

// // SendGrid API approach
// async function sendEmailViaSendGrid(
//   to: string,
//   subject: string,
//   html?: string,
//   text?: string
// ) {
//   const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");
//   const FROM_EMAIL =
//     Deno.env.get("EMAIL_FROM") || "Diligent Events <nkwadanora@gmail.com>";

//   if (!SENDGRID_API_KEY) {
//     throw new Error("SendGrid API key not found");
//   }

//   const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${SENDGRID_API_KEY}`,
//     },
//     body: JSON.stringify({
//       personalizations: [{ to: [{ email: to }] }],
//       from: {
//         email: FROM_EMAIL.includes("<")
//           ? FROM_EMAIL.match(/<(.+)>/)?.[1] || FROM_EMAIL
//           : FROM_EMAIL,
//         name: "Diligent Events",
//       },
//       subject,
//       content: [
//         {
//           type: "text/plain",
//           value: text || "",
//         },
//         {
//           type: "text/html",
//           value: html || "",
//         },
//       ],
//     }),
//   });

//   if (!response.ok) {
//     const errorData = await response.json().catch(() => null);
//     console.error("SendGrid error response:", errorData || response.statusText);
//     throw new Error(JSON.stringify(errorData) || response.statusText);
//   }

//   return true;
// }

// serve(async (req) => {
//   // Handle CORS preflight requests
//   if (req.method === "OPTIONS") {
//     return new Response("ok", { headers: corsHeaders });
//   }

//   try {
//     // Log the request for debugging
//     console.log("Received request:", req.method, req.url);

//     let requestBody;
//     try {
//       requestBody = await req.json();
//       console.log("Request body:", JSON.stringify(requestBody));
//     } catch (e) {
//       console.error("Error parsing JSON:", e);
//       return new Response(JSON.stringify({ error: "Invalid JSON payload" }), {
//         status: 400,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       });
//     }

//     const { to, subject, html, text } = requestBody;

//     if (!to || !subject || (!html && !text)) {
//       console.log("Missing fields:", { to, subject, html, text });
//       return new Response(
//         JSON.stringify({ error: "Missing required fields" }),
//         {
//           status: 400,
//           headers: { ...corsHeaders, "Content-Type": "application/json" },
//         }
//       );
//     }

//     // Use SendGrid to send email
//     await sendEmailViaSendGrid(to, subject, html, text);
//     console.log("Email sent successfully to:", to);

//     return new Response(
//       JSON.stringify({ success: true, message: "Email sent successfully" }),
//       {
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       }
//     );
//   } catch (error) {
//     console.error("Email sending error:", error);

//     return new Response(
//       JSON.stringify({ error: error.message || "Unknown error occurred" }),
//       {
//         status: 500,
//         headers: { ...corsHeaders, "Content-Type": "application/json" },
//       }
//     );
//   }
// });
