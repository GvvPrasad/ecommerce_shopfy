import { test, expect, request } from "../../fixtures/baseFixture";
import { ENV_CONFIG } from '../../config/config.env'


const loginPayload: object = { userEmail: ENV_CONFIG.apiUserEmail, userPassword: ENV_CONFIG.apiUserPassword };

test('Login with API', async ({ request }) => {

    // Send POST request of login API
    const loginResponse = await request.post(ENV_CONFIG.apiBaseUrl + `/api/ecom/auth/login`, { data: loginPayload });

    //session storage is saved in json file
    await request.storageState({ path: 'api/session/loginsessionstorage.json' });

    //token is extracted from login response and printed in console
    const loginJsonResponse = await loginResponse.json();
    const token = loginJsonResponse.token;
    console.log(token);

    // Assertions
    expect(loginResponse.status()).toBe(200);
    expect(token).not.toBeNull();

});