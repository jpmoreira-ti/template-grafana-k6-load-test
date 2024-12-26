// 1. Init code
import http from 'k6/http';
import { check, sleep } from 'k6';

// 2. VU code
export default function () {
    let res = http.get('https://test.k6.io');

    // Asserting the response code
    check(res, { 
        'Status should be 200': (r) => r.status == 200 
    });
    
    sleep(1);
}

// 3. Teardown code
export function teardown() {
    console.log("Test finished!")
 }