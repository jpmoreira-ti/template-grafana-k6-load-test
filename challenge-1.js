// init
import http from 'k6/http'
import { check } from 'k6';

// setup
export const options = {
    vus: 1,
    duration: '30s',
    threshold: {
        checks: ['rate > 0.99']
    }
}

//vu code
export default function() {
    let res = http.get('https://test-api.k6.io/public/crocodiles/')

    check(res, {
        'Check status code 200': (r) => r.status == 200
    });
}

//teardown
export function teardown() 
{
    console.log('Test finished!')
}
