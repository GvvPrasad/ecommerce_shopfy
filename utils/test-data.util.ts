import { faker } from '@faker-js/faker';
import { BookingPayload, BookingDates } from '../types/booking.types';

/**
 * Test Data Utility for generating random booking data
 */
export class TestDataGenerator {

    /**
     * Generate random booking dates
     * @param checkInDaysFromNow Days from today for check-in
     * @param checkOutDaysFromNow Days from today for check-out
     * @returns BookingDates object
     */
    static generateBookingDates(checkInDaysFromNow: number = 5, checkOutDaysFromNow: number = 10): BookingDates {
        const checkInDate = new Date();
        checkInDate.setDate(checkInDate.getDate() + checkInDaysFromNow);
        
        const checkOutDate = new Date();
        checkOutDate.setDate(checkOutDate.getDate() + checkOutDaysFromNow);

        return {
            checkin: checkInDate.toISOString().split('T')[0],
            checkout: checkOutDate.toISOString().split('T')[0]
        };
    }

    /**
     * Generate random booking payload with faker data
     * @param overrides Partial booking data to override defaults
     * @returns BookingPayload with random data
     */
    static generateBookingPayload(overrides?: Partial<BookingPayload>): BookingPayload {
        const defaultPayload: BookingPayload = {
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            totalprice: faker.number.int({ min: 1000, max: 5000 }),
            depositpaid: faker.datatype.boolean(),
            bookingdates: this.generateBookingDates(),
            additionalneeds: faker.lorem.word()
        };

        return { ...defaultPayload, ...overrides };
    }

    /**
     * Generate random first name
     * @returns Random first name
     */
    static generateFirstName(): string {
        return faker.person.firstName();
    }

    /**
     * Generate random last name
     * @returns Random last name
     */
    static generateLastName(): string {
        return faker.person.lastName();
    }

    /**
     * Generate random total price
     * @param min Minimum price (default: 1000)
     * @param max Maximum price (default: 5000)
     * @returns Random price between min and max
     */
    static generatePrice(min: number = 1000, max: number = 5000): number {
        return faker.number.int({ min, max });
    }

    /**
     * Generate random additional needs
     * @returns Random text for additional needs
     */
    static generateAdditionalNeeds(): string {
        return faker.lorem.sentence();
    }
}
