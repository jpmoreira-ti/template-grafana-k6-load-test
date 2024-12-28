// 1. Init code
import http from 'k6/http';
import { check, sleep } from 'k6';

// 2. Setup code
export const options = {
    // Number of virtual users to simulate
    vus: 5,
    
    // Total duration of the test (in seconds)
    duration: '2s',  

    // Setting thresholds(limits) for response duration
    thresholds: {
        // Threshold for failure rate (less than 1%)
        http_req_failed: ['rate<0.01'], 
        // 95th percentile of request duration should be below 200ms
        http_req_duration: ['p(95)<200'], 
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

// teardown code
export function teardown() {
    console.log('Test has finished!')
}