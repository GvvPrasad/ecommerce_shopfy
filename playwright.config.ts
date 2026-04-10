import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';


// Load env file based on ENV variable passed via CLI
const envFile = process.env.ENV ? `.env.${process.env.ENV}` : '.env.qa';
dotenv.config({ path: path.resolve(__dirname,'env', envFile) });

// Sanitize: strip any accidental surrounding quotes
const baseURL = process.env.BASE_URL?.replace(/^['"]|['"]$/g, '');
console.log(`Running tests against: ${baseURL}`);


export default defineConfig({

  //default test script location
  testDir: './tests',

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry on CI only
  retries: process.env.CI ? 2 : 1,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  // playwright reports
  reporter: 'html',

  // Folder for test artifacts such as screenshots, videos, traces, etc.
  outputDir: 'test-results',



  // Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

     // get base url from config file
    baseURL: baseURL,

    //for max window size
    viewport: {width:1920,height:1080},

    //test mode
    headless: false,

   

    // Collect trace when retrying the failed test
    trace: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
/*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
*/
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
