// 1. Init code
import http from 'k6/http';
import { sleep } from 'k6';

// 2. Setup code
export const options = {
    scenarios: {
        crocodiles: {
            executor: 'per-vu-iterations',
            vus: 10,
            iterations: 20,
            maxDuration: '30s'
        }
    }
}

// 3. VU code
export default function () {
    http.get('https://test-api.k6.io/public/crocodiles/');
    sleep(0.5);
}

// teardown code
export function teardown() {
    console.log('Test has finished!')
}