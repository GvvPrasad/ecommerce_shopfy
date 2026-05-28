
import { test, expect, request } from '../../fixtures/base.fixture'

let bookingID:number;
let firstname:string;
let lastname:string;

test('Get all booking ids', async ({ pomanager}) => {
   
    const apiContext = await request.newContext();
    const response = await pomanager.apiUtility.getRequest(apiContext, 'booking');
    const responsebody = await response.json();
    console.log('Full Response:', responsebody);
    
    bookingID = responsebody[2].bookingid
    console.log("Booking Id: ", bookingID)
});

test('Get specific booking details with path parameters', async ({ pomanager}) => {
   
    const apiContext = await request.newContext();
    const response = await pomanager.apiUtility.getRequest(apiContext, `booking/${bookingID}`);
    const responsebody = await response.json();
    console.log('****Full Response from 2nd request :', responsebody);
    firstname = responsebody.firstname;
    lastname = responsebody.lastname;
});

test('Get specific booking details with query parameters', async ({ pomanager}) => {
   
    const apiContext = await request.newContext();
    const response = await pomanager.apiUtility.getRequest(apiContext, 'booking', { params: { firstname: 'Susdfsdfan', lastname: 'Wisfsdlson' } });
    const responsebody = await response.json();
    console.log('****Full Response from 3rd request :', responsebody);


});

