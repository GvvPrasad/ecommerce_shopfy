import { test, expect } from '@playwright/test';
import { BookingAPI } from '../../pages/booking-api.page';
import { BookingPayload } from '../../types/booking.types';
import { TestDataGenerator } from '../../utils/test-data.util';

test('Book a Room - Create Booking with Random Data', async ({ request }) => {

    // Initialize booking API page object
    const bookingAPI = new BookingAPI(request);

    // Generate random test data using faker
    const bookingPayload: BookingPayload = TestDataGenerator.generateBookingPayload();

    console.log('Generated Booking Payload:', bookingPayload);

    // Post API Request
    const bookingResponse = await bookingAPI.createBooking(bookingPayload);
    console.log('Booking Response:', bookingResponse);

    // Validation: Verify booking data matches the request
    await bookingAPI.verifyBookingData(
        bookingResponse,
        bookingPayload.firstname,
        bookingPayload.lastname
    );

    // Validation: Verify booking dates are valid
    await bookingAPI.verifyBookingDates(bookingResponse);

    // Validation: Verify booking ID exists
    await bookingAPI.verifyBookingIdExists(bookingResponse);

});