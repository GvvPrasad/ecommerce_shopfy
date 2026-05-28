import path from 'node:path';
import { test, expect, request } from '../../fixtures/base.fixture'


test('Token Creation', async ({ pomanager}) => {

    const newUserpath = require( path.resolve(__dirname,'../../test-data/api-test-data/tokencreation.json'));
    const apiContext = await request.newContext();
    const response = await pomanager.apiUtility.postRequest(apiContext, 'auth', newUserpath);
    const responsebody = await response.json();
    console.log('Full Response:', responsebody);
    console.log('Token:', responsebody.token);
});