// 1. Init code
import http from 'k6/http';
import { check, sleep } from 'k6';

// 2. Setup code
export const options = {
    // Setting thresholds(limits) for response duration
    thresholds: {
        // 'p(90)<150' ensures that 90% of the requests have a duration below 150ms.
        // 'p(95)<150' ensures that 95% of the requests have a duration below 150ms.
        http_req_duration: ['p(90)<150','p(95)<150']
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