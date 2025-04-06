import http from 'k6/http';
import { check, sleep } from 'k6';

// Test options for ramping up users
export const options = {
  stages: [
    { duration: '30s', target: 20 }, // Ramp up to 20 users over 30 seconds
    { duration: '1m30s', target: 10 }, // Stay at 10 users for 1 minute 30 seconds
    { duration: '20s', target: 0 }, // Ramp down to 0 users over 20 seconds
  ],
};

export default function () {
  // Authentication payload (username and password)
  const payload = JSON.stringify({
    username: 'admin',  // Replace with valid username
    password: 'password123',  // Replace with valid password
  });

  // Request headers to indicate JSON payload
  const headers = {
    'Content-Type': 'application/json',
  };

  // Send POST request to /auth endpoint
  const res = http.post('https://restful-booker.herokuapp.com/auth', payload, { headers });

  // Check if the response status is 200 (OK) and the response body contains token
  check(res, {
    'status was 200': (r) => r.status === 200,
    'response contains token': (r) => r.body.includes('token'),
  });

  // Extract the token from the response body (JSON)
  const responseBody = JSON.parse(res.body);
  const token = responseBody.token;  // Extract the token

  console.log(`Received token: ${token}`);

  // Simulate a "think time" of 1 second before the next request
  sleep(1);
}
