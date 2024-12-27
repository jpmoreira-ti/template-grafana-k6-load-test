// 1. Init code
import http from 'k6/http';
import { check, sleep } from 'k6';

// 2. Setup code
export const options = {
    stages: [
        // Ramp-up (increase) load to 2 users in 30 seconds
        { duration: '30s', target: 2 },
        
        // Maintain constant load with 5 users for 4 minutes
        { duration: '4m', target: 5 },

        // Ramp-down (decrease) to 0 users in 30 seconds
        { duration: '30s', target: 0 },
    ],

    // Setting thresholds(limits) for response duration
    thresholds: {
        // Threshold for failure rate (less than 1%)
        http_req_failed: ['rate < 0.01'], 
        // 95th percentile of request duration should be below 300ms
        http_req_duration: ['p(95) < 300'], 
    }
}

// 3. VU code
export default function () {
    let res = http.get('https://test.k6.io');

    // Asserting the response code
    check(res, { 
        'Status should be 200': (r) => r.status == 200 
    });
    
    sleep(1);
}

// 4. Teardown code
export function teardown() {
   console.log("Test finished!")
}