import { ENV_CONFIG } from '../config/config.env'
import { APIRequestContext } from '@playwright/test';

export class ApiUtility {

    constructor() { };

    readonly apiBaseUrl = ENV_CONFIG.API_BASE_URL;
    readonly defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };


    //Post Request
    async postRequest(apiContext: APIRequestContext, endpoint: string, data: any, headers?: any) {
        //make a request
        const response = await apiContext.post(`${this.apiBaseUrl}${endpoint}`, {
            headers: { ...this.defaultHeaders, ...headers },
            data: data
        });

        if (!response.ok()) {
            throw new Error(`POST ${endpoint} failed: ${response.status()} ${response.statusText()}`);
        }
        return response;
    }

    //Get Request
    async getRequest(apiContext: APIRequestContext, endpoint: string, data?: any, headers?: any) {
        //make a request
        const response = await apiContext.get(`${this.apiBaseUrl}${endpoint}`, {
            headers: { ...this.defaultHeaders, ...headers },
            data: data
        });

        if (!response.ok()) {
            throw new Error(`GET ${endpoint} failed: ${response.status()} ${response.statusText()}`);
        }
        return response;
    }


    //put Request
    async putRequest(apiContext: APIRequestContext, endpoint: string, data: any, headers?: any) {
        //make a request
        const response = await apiContext.put(`${this.apiBaseUrl}${endpoint}`, {
            headers: { ...this.defaultHeaders, ...headers },
            data: data
        });

        if (!response.ok()) {
            throw new Error(`PUT ${endpoint} failed: ${response.status()} ${response.statusText()}`);
        }
        return response;
    }

    //Patch Request
    async patchRequest(apiContext: APIRequestContext, endpoint: string, data: any, headers?: any) {
        //make a request
        const response = await apiContext.patch(`${this.apiBaseUrl}${endpoint}`, {
            headers: { ...this.defaultHeaders, ...headers },
            data: data
        });

        if (!response.ok()) {
            throw new Error(`PATCH ${endpoint} failed: ${response.status()} ${response.statusText()}`);
        }
        return response;
    }

    //Delet Request
    async deleteRequest(apiContext: APIRequestContext, endpoint: string, data?: any, headers?: any) {
        //make a request
        const response = await apiContext.delete(`${this.apiBaseUrl}${endpoint}`, {
            headers: { ...this.defaultHeaders, ...headers },
            data: data
        });

        if (!response.ok()) {
            throw new Error(`DELETE ${endpoint} failed: ${response.status()} ${response.statusText()}`);
        }
        return response;
    }





}