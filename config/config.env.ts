import * as dotenv from 'dotenv';
import * as path from 'path';

const envFile = process.env.ENV ? `.env.${process.env.ENV}` : '.env.qa';
dotenv.config({ path: path.resolve(__dirname, '../env', envFile) });

const baseURL = process.env.BASE_URL?.replace(/^['"]|['"]$/g, '');
const userSignInEmail = process.env.USER_EMAIL;
const userSignInPassword = process.env.USER_PASSWORD;

export const ENV_CONFIG = {
  baseURL, userSignInEmail, userSignInPassword,
};

