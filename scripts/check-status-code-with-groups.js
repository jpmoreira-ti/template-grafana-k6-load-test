// 1. Init code
import http from 'k6/http';
import { check, group, sleep } from 'k6';

// 2. Setup code
export const options = {
    // Number of virtual users to simulate
    vus: 15,

    // Total duration of the test (in seconds)
    duration: '2s',  

    // Setting thresholds(limits) for response duration
    thresholds: {
        'http_req_duration{group:::GetAllCrocodiles}': [
            { threshold: 'p(90) < 200', abortOnFail: true, delayAborEval: '10s' }
        ],
        'http_req_duration{group:::GetCrocodileById}': [
            { threshold: 'p(90) < 200', abortOnFail: true, delayAborEval: '10s' },
            { threshold: 'p(95) < 200', abortOnFail: true, delayAborEval: '10s' }
        ],
        checks: ['rate > 0.99']
    }
}

// 3. VU code
export default function () {
    group('GetAllCrocodiles', function () {
        let resGetAllCrocodiles = http.get('https://test-api.k6.io/public/crocodiles/');

        // Asserting the response code
        check(resGetAllCrocodiles, { 
            'Status should be 200': (r) => r.status == 200 
        });

    });

    group('GetCrocodileById', function() {
        let resGetCrocodileById = http.get('https://test-api.k6.io/public/crocodiles/1/');

        // Asserting the response code
        check(resGetCrocodileById, { 
            'Status should be 200': (r) => r.status == 200 
        });
    })

    sleep(1);
}

// teardown code
export function teardown() {
    console.log('Test has finished!')
}