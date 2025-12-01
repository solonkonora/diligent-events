declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    NEXT_PUBLIC_DEVELOPMENT_URL: string;
    NEXT_PUBLIC_PRODUCTION_URL: string;
    RESEND_API_KEY: string;
    EMAIL_FROM: string;
  }
}
