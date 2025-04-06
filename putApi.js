import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
};

export default function () {
  // The booking ID to update
  const bookingId = 1920;

  // Data for the update
  const payload = JSON.stringify({
    firstname: "afia",
    lastname: "afia",
    totalprice: 777,
    depositpaid: true,
    bookingdates: {
      checkin: "2018-01-01",
      checkout: "2019-01-01"
    },
    additionalneeds: "Breakfast"
  });

  // Set headers for the PUT request
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cookie': 'token=a4568f8c323846d',  // Replace with a valid token if needed
  };

  // Send PUT request to update booking with the specified booking ID
  const res = http.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`, payload, { headers });

  // Check if the status code is 200 and if the response contains the updated data
  check(res, {
    'status was 200': (r) => r.status === 200,
    'response contains firstname': (r) => r.body.includes('afia'),
    'response contains lastname': (r) => r.body.includes('afia'),
    'response contains totalprice': (r) => r.body.includes('777'),
    'response contains additionalneeds': (r) => r.body.includes('Breakfast'),
  });

  // Simulate user think time
  sleep(1);
}
