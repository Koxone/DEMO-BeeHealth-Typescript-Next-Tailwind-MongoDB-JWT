declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URI: string;
    MONGODB_DB: string;
    JWT_SECRET: string;

    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_REDIRECT_URI: string;
    GOOGLE_PROJECT_ID: string;
    GOOGLE_AUTH_URI: string;
    GOOGLE_TOKEN_URI: string;
    GOOGLE_CERT_URL: string;
    GOOGLE_SERVICE_ACCOUNT_KEY: string;
    GOOGLE_CALENDAR_ID_WEIGHT: string;
    GOOGLE_CALENDAR_ID_DENTAL: string;
    GOOGLE_ACCESS_TOKEN: string;
    GOOGLE_REFRESH_TOKEN: string;

    NEXT_PUBLIC_BASE_URL: string;
  }
}
