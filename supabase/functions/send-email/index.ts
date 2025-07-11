import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// SendGrid API approach
async function sendEmailViaSendGrid(
  to: string,
  subject: string,
  html?: string,
  text?: string
) {
  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const FROM_EMAIL = process.env.EMAIL_FROM || "nkwadanora@gmail.com";

  if (!SENDGRID_API_KEY) {
    throw new Error("SendGrid API key not found");
  }

  const fromEmail = FROM_EMAIL.includes("<")
    ? FROM_EMAIL.match(/<(.+)>/)?.[1] || FROM_EMAIL
    : FROM_EMAIL;

  const content = [];

  if (text && text.trim().length > 0) {
    content.push({
      type: "text/plain",
      value: text,
    });
  }

  if (html && html.trim().length > 0) {
    content.push({
      type: "text/html",
      value: html,
    });
  }

  // If no content provided, use a default text
  if (content.length === 0) {
    content.push({
      type: "text/plain",
      value: subject,
    });
  }

  const payload = {
    personalizations: [{ to: [{ email: to }] }],
    from: {
      email: fromEmail,
      name: "Diligent Events",
    },
    subject,
    content,
  };

  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      `SendGrid API error: ${response.status} - ${JSON.stringify(errorData) || response.statusText}`
    );
  }

  return true;
}

serve(async (req) => {
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

    // Use SendGrid to send email
    await sendEmailViaSendGrid(to, subject, html, text);

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
