declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    DATABASE: string;
    DATABASE_PASSWORD: string;
    EMAIL: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_CLIENT_GMAIL_REFRESH_TOKEN: string;
    GOOGLE_REDIRECT_URL: string;
    FRONT_REDIRECT_URL: string;
    FRONT_RESETPASSWORD_PATH: string;
    JWT_ACCESS_TOKEN_EXPIRES_IN: string;
    JWT_REFRESH_TOKEN_EXPIRES_IN: string;
    JWT_RESETPASSWORD_TOKEN_EXPIRES_IN: string;
    FIREBASE_TYPE: string;
    FIREBASE_PROJECT_ID: string;
    FIREBASE_PRIVATE_KEY_ID: string;
    FIREBASE_PRIVATE_KEY: string;
    FIREBASE_CLIENT_EMAIL: string;
    FIREBASE_CLIENT_ID: string;
    FIREBASE_AUTH_URI: string;
    FIREBASE_TOKEN_URI: string;
    FIREBASE_AUTH_PROVIDER_X509_CERT_URL: string;
    FIREBASE_CLIENT_X509_CERT_URL: string;
  }
}
