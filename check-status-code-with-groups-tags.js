// 1. Init code
import http from 'k6/http';
import { check, group, sleep } from 'k6';
import { SharedArray }  from 'k6/data';

// 2. Setup code
export const options = {
    // Number of virtual users to simulate
    vus: 15,

    // Total duration of the test (in seconds)
    duration: '2s',  

    // Setting thresholds(limits) for response duration
    thresholds: {
        'http_req_duration{type:get-by-id"}': [
            { threshold: 'p(95) < 200', abortOnFail: true, delayAborEval: '10s' }
        ],
        checks: ['rate > 0.99']
    }
}

const data = new SharedArray('Read json data', function(){
    return JSON.parse(open('./data/crocodiles.json')).crocodiles
})

// 3. VU code
export default function () {
    group('GetAllCrocodiles', function () {
        let resGetAllCrocodiles = http.get('https://test-api.k6.io/public/crocodiles/',{
            tags: {
                type: "get-all" 
            }
        });

        // Asserting the response code
        check(resGetAllCrocodiles, { 
            'Status should be 200': (r) => r.status == 200 
        });

    });

    group('GetCrocodileById', function() {
        const crocodileId = data[Math.floor(Math.random() * data.length)].id
        console.log(crocodileId)
        let resGetCrocodileById = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileId}/`, {
            tags: {
                type: "get-by-id"
            }
        });

        // Asserting the response code
        check(resGetCrocodileById, { 
            'Status should be 200': (r) => r.status == 200 
        });
    })

    sleep(1);
}

// 4. Teardown code
export function teardown() {
    console.log("Test finished!")
}