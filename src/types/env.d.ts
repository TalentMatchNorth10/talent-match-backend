declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    DATABASE: string;
    DATABASE_PASSWORD: string;
    JWT_SECRET: string;
    JWT_REFRESH_SECRET: string;
    JWT_RESETPASSWORD_SECRET: string;
    JWT_ACCESS_TOKEN_EXPIRES_IN: string;
    JWT_REFRESH_TOKEN_EXPIRES_IN: string;
    JWT_RESETPASSWORD_TOKEN_EXPIRES_IN: string;
    EMAIL: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_CLIENT_GMAIL_REFRESH_TOKEN: string;
  }
}
