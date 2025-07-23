declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    NEXT_PUBLIC_DEVELOPMENT_URL: string;
    NEXT_PUBLIC_PRODUCTION_URL: string;
    SENDGRID_API_KEY: string;
    EMAIL_FROM: string;
    EMAIL_USER: string;
    EMAIL_PASSWORD: string;
  }
}
