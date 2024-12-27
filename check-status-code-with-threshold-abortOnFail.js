// 1. Init code
import http from 'k6/http';
import { check, sleep } from 'k6';

// 2. Setup code
export const options = {
    // Number of virtual users to simulate
    vus: 15,

    // Total duration of the test (in seconds)
    duration: '2s',  

    // Setting thresholds(limits) for response duration
    thresholds: {
        // 'p(90)<150' ensures that 90% of the requests have a duration below 200ms.
        // 'p(95)<150' ensures that 95% of the requests have a duration below 150ms.
        http_req_duration: [
            { threshold: 'p(90) < 200', abortOnFail: true },
            { threshold: 'p(95) < 150', abortOnFail: true }
        ]
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