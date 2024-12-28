// 1. Init code
import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

// 2. VU code
export default function () {
    let res = http.get('https://test.k6.io');

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
        "./reports/teste_k6.html": htmlReport(data, { title: reportTitle }),
        stdout: textSummary(data, { indent: " ", enableColors: true })
    };
}