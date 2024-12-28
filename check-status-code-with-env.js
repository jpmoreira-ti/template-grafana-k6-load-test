// 1. Init code
import http from 'k6/http';
import { check, sleep, __ENV } from 'k6';

// 2. Setup code
export const options = {
    // Setting thresholds(limits) for response duration
    thresholds: {
        'http_req_duration{type:get-by-id"}': [
            { threshold: 'p(95) < 200', abortOnFail: true, delayAborEval: '10s' }
        ],
        checks: ['rate > 0.99']
    }
}

// 3. VU code
export default function () {
    const BASE_URL = __ENV.URL;

    let resGetCrocodileById = http.get(BASE_URL, {
        tags: {
            type: "get-by-id"
        }
    });

    // Asserting the response code
    check(resGetCrocodileById, { 
        'Status should be 200': (r) => r.status == 200 
    });

    sleep(1);
}

// teardown code
export function teardown() {
    console.log('Test has finished!')
}
