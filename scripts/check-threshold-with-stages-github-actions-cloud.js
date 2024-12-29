// 1. Init code
import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

// 2. Setup code
export const options = {
    stages: [
        // Ramp-up (increase) load to 2 users in 10 seconds
        { duration: '10s', target: 2 },
        
        // Maintain constant load with 5 users for 30 seconds
        { duration: '30s', target: 5 },

        // Ramp-down (decrease) to 0 users in 10 seconds
        { duration: '10s', target: 0 },
    ],

    // Setting thresholds(limits) for response duration
    thresholds: {
        // Threshold for failure rate (less than 1%)
        http_req_failed: ['rate < 0.01'], 
        // 95th percentile of request duration should be below 300ms
        http_req_duration: ['p(95) < 300'], 
    },

    ext: {
        loadimpact: {
            projectID: '3733382',
            name: 'Execution on grafana cloud'
        }
    }
}

// 3. VU code
export default function () {
    const BASE_URL = 'https://test-api.k6.io/public/crocodiles'
    const res = http.get(BASE_URL);

    // Asserting the response code
    check(res, { 
        'Status should be 200': (r) => r.status == 200 
    });
    
    sleep(1);
}

// teardown code
export function handleSummary(data) {
    const currentDateTime = new Date().toLocaleString();
    const reportTitle = `Load Testing Report - ${currentDateTime}`;

    return {
        "k6-report.html": htmlReport(data, { title: reportTitle }),
        stdout: textSummary(data, { indent: " ", enableColors: true })
    };
}