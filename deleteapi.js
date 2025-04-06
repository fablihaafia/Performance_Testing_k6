import http from 'k6/http';
import { check, sleep } from 'k6';

// Test options for load simulation
export const options = {
  stages: [
    { duration: '30s', target: 20 },  // Ramp up to 20 users over 30 seconds
    { duration: '1m30s', target: 10 }, // Stay at 10 users for 1 minute 30 seconds
    { duration: '20s', target: 0 },  // Ramp down to 0 users over 20 seconds
  ],
};

export default function () {
  // The booking ID to delete
  const bookingId = 3923;  // Example booking ID (replace with a valid ID)

  // Replace with a valid authentication token
  const token = '3bf6fce6d1e8250';  // Replace with actual token if needed

  // Set headers for the DELETE request
  const headers = {
    'Cookie': `token=${token}`,  // Include the valid token here
  };

  // Send the DELETE request to remove the booking
  const res = http.del(`https://restful-booker.herokuapp.com/booking/${bookingId}`, null, { headers });

  // Check if the status is 201 (created) to confirm deletion success
  check(res, {
    'status was 201': (r) => r.status === 201,
  });

  sleep(1);  // Simulate user think time
}
