import { APIRequestContext, expect } from '@playwright/test';
import { ENV_CONFIG } from '../config/config.env';
import { BookingPayload, BookingPostResponse } from '../types/booking.types';

/**
 * Booking API Page Object
 * Handles all booking-related API operations
 */
export class BookingAPI {

    private readonly baseUrl: string = ENV_CONFIG.Base_Api_Url;
    private readonly bookingEndpoint: string = 'booking';

    constructor(private readonly request: APIRequestContext) { }

    /**
     * Create a new booking
     * @param bookingData Booking payload
     * @returns Booking response with booking ID
     */
    async createBooking(bookingData: BookingPayload): Promise<BookingPostResponse> {
        const response = await this.request.post(`${this.baseUrl}${this.bookingEndpoint}`, {
            data: bookingData
        });

        return await response.json();
    }

    /**
     * Verify booking response status
     * @param response Response from createBooking
     */
    async verifyBookingResponseStatus(response: any): Promise<void> {
        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe('OK');
        expect(response.headers()['content-type']).toContain('application/json');
    }

    /**
     * Verify booking data in response
     * @param bookingResponse Response data
     * @param expectedFirstName Expected first name
     * @param expectedLastName Expected last name
     */
    async verifyBookingData(
        bookingResponse: BookingPostResponse,
        expectedFirstName: string,
        expectedLastName: string
    ): Promise<void> {
        expect(bookingResponse.booking.firstname).toBe(expectedFirstName);
        expect(bookingResponse.booking.lastname).toBe(expectedLastName);
        expect(bookingResponse.booking.bookingdates).toHaveProperty('checkin');
        expect(bookingResponse.booking.bookingdates).toHaveProperty('checkout');
        expect(bookingResponse.bookingid).toBeGreaterThan(0);
    }

    /**
     * Verify booking ID exists and is valid
     * @param bookingResponse Response data
     */
    async verifyBookingIdExists(bookingResponse: BookingPostResponse): Promise<void> {
        expect(bookingResponse.bookingid).toBeGreaterThan(0);
    }

    /**
     * Verify booking dates are valid
     * @param bookingResponse Response data
     */
    async verifyBookingDates(bookingResponse: BookingPostResponse): Promise<void> {
        expect(bookingResponse.booking.bookingdates).toHaveProperty('checkin');
        expect(bookingResponse.booking.bookingdates).toHaveProperty('checkout');
        
        const checkinDate = new Date(bookingResponse.booking.bookingdates.checkin);
        const checkoutDate = new Date(bookingResponse.booking.bookingdates.checkout);
        
        expect(checkinDate < checkoutDate).toBeTruthy();
    }
}
