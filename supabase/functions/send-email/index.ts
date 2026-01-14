// @ts-nocheck
// Deno Edge Function - TypeScript checking disabled
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Resend API approach
async function sendEmailViaResend(
  to: string,
  subject: string,
  html?: string,
  text?: string
) {
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  const FROM_EMAIL = Deno.env.get("EMAIL_FROM") || "bookings@diligentservices.works";

  if (!RESEND_API_KEY) {
    throw new Error("Resend API key not found");
  }

  const payload: {
    from: string;
    to: string[];
    subject: string;
    html?: string;
    text?: string;
  } = {
    from: `Diligent Events <${FROM_EMAIL}>`,
    to: [to],
    subject,
  };

  if (html && html.trim().length > 0) {
    payload.html = html;
  }

  if (text && text.trim().length > 0) {
    payload.text = text;
  }

  // If no content provided, use subject as text
  if (!payload.html && !payload.text) {
    payload.text = subject;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      `Resend API error: ${response.status} - ${JSON.stringify(errorData) || response.statusText}`
    );
  }

  return true;
}

serve(async (req: { method: string; json: () => any; }) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (e) {
      return new Response(JSON.stringify({ error: "Invalid JSON payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { to, subject, html, text } = requestBody;

    if (!to || !subject || (!html && !text)) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Use Resend to send email
    await sendEmailViaResend(to, subject, html, text);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
                                                                                                                      