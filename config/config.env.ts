import * as dotenv from "dotenv";
import * as path from "path";

// Load the correct .env file based on ENV
const environment  = process.env.ENV ? process.env.ENV : "qa";
const envPath = path.resolve( __dirname, "../env", `.env.${environment}` );

//Load environment variables from file.
dotenv.config({ path: envPath,});

//clean environment variables. removes extra quotes.
const removeExtraQuotes = (value: string) => value.replace(/^['"]|['"]$/g, "");

const cleanedConfig = Object.entries(process.env).reduce(
  (result, [key, value]) => {
    if (value !== undefined) {
      result[key] = removeExtraQuotes(value);
    }
    return result;
  },
  {} as Record<string, string>
);

export const ENV_CONFIG = cleanedConfig;
