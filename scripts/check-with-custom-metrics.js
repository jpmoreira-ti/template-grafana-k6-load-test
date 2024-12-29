// 1. Init code
import http from 'k6/http';
import { sleep } from 'k6';
import { Gauge, Rate, Trend } from 'k6/metrics';

// 2. Setup code
const myGauge = new Gauge('blocked_time');
const myRateStatusCodeSuccess = new Rate('tax_rate_status_code')
const myTrend = new Trend('tax_waiting')

export const options = {
    vus: 3,
    duration: '5s'
}

// 3. VU code
export default function () {
    let res = http.get('https://test.k6.io');

    // Asserting the blocked time < 1
    myGauge.add(res.timings.blocked < 1)

    // Asserting rate status code 200
    myRateStatusCodeSuccess.add(res.status === 200);

    // Asserting the waiting time < 1
    myTrend.add(res.timings.waiting < 1);
    
    sleep(1);
}

// teardown code
export function teardown() {
    console.log('Test has finished!')
}