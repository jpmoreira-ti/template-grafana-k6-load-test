// 1. Init code
import http from 'k6/http';

// 2. Setup code
export const options = {
    scenarios: {
        crocodiles: {
            executor: 'constant-arrival-rate',
            duration: '30s',
            rate: 30,
            timeUnit: '1s',
            preAllocatedVUs: 50,
        }
    }
}

// 3. VU code
export default function () {
    http.get('https://test-api.k6.io/public/crocodiles/');
}

// teardown code
export function teardown() {
    console.log('Test has finished!')
}