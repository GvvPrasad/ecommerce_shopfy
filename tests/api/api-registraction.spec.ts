import path from 'node:path';
import { test, expect, request } from '../../fixtures/base.fixture'



test.skip('Register with API', async ({ pomanager }) => {

    const newUserpath = require( path.resolve(__dirname,'../../test-data/api-test-data/register-user.json'))
    const apiContext = await request.newContext();
    const response = await pomanager.apiUtility.postRequest(apiContext, '/api/ecom/auth/register', newUserpath);

    console.log('Response Status:', response.status());
    expect(response.status()).toBe(200);
    await apiContext.dispose();

});