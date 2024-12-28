// 1. Init code
import http from 'k6/http';
import { sleep } from 'k6';

// 2. Setup code
export const options = {
    scenarios: {
        crocodiles: {
            executor: 'shared-iterations',
            vus: 10,
            iterations: 200,
            maxDuration: '30s'
        }
    }
}

// 3. VU code
export default function () {
    http.get('https://test-api.k6.io/public/crocodiles/');
    sleep(0.5);
}

// 4. Teardown code
export function teardown() {
    console.log("Test finished!")
}