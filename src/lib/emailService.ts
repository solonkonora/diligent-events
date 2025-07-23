import { createClient } from "@supabase/supabase-js";

// initialize the Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}) {
  try {
    const { data, error } = await supabase.functions.invoke("send-email", {
      body: { to, subject, html, text },
    });

    if (error) {
      console.error("Error calling email function:", error);
      return false;
    }

    return data?.success === true;
  } catch (error) {
    console.error("Exception calling email function:", error);
    return false;
  }
}
