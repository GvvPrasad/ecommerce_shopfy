import * as dotenv from "dotenv";
import * as path from "path";

// Load the correct .env file based on ENV
const envFile = process.env.ENV ? `.env.${process.env.ENV}` : ".env.qa";
dotenv.config({ path: path.resolve(__dirname, "../env", envFile) });

// Helper to enforce presence of env vars
function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value.replace(/^['"]|['"]$/g, "");
}

// Strongly typed config interface
interface EnvConfig {
  ENV: string;
  baseURL: string;
  userSignInEmail: string;
  userSignInPassword: string;
  userCName: string;
  userCNumber: string;
  userCcvc: string;
  userCexpmonth: string;
  userCexpyear: string;
  apiBaseUrl: string;
  apiUserEmail:string;
  apiUserPassword: string;
}

// Export config object with null‑assertion safety
export const ENV_CONFIG: EnvConfig = {
  ENV: getEnvVar("ENV"),
  baseURL: getEnvVar("BASE_URL"),
  userSignInEmail: getEnvVar("USER_EMAIL"),
  userSignInPassword: getEnvVar("USER_PASSWORD"),
  userCName: getEnvVar("USER_CName"),
  userCNumber: getEnvVar("User_CNumber"),
  userCcvc: getEnvVar("User_Ccvc"),
  userCexpmonth: getEnvVar("User_Cexpmonth"),
  userCexpyear: getEnvVar("User_Cexpyear"),
  apiBaseUrl: getEnvVar("BASE_API_URL"),
  apiUserEmail: getEnvVar("API_USER_EMAIL"),
  apiUserPassword: getEnvVar("API_USER_PASSWORD"),
};
