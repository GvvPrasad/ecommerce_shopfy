import * as dotenv from 'dotenv';
import * as path from 'path';

const envFile = process.env.ENV ? `.env.${process.env.ENV}` : '.env.qa';
dotenv.config({ path: path.resolve(__dirname, envFile) });

const baseURL = process.env.BASE_URL?.replace(/^['"]|['"]$/g, '');
console.log(`Running tests against: ${baseURL}`);

export const ENV_CONFIG = {
  baseURL,
};

