// init
import http from 'k6/http'
import { check } from 'k6'
import { SharedArray } from 'k6/data'
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js'

// setup
export const options = {
    stages: [
        // ramp up
        {duration: '1s', target: 1 },
        // load 
        {duration: '5s', target: 5 },
        // ramp up
        {duration: '2s', target: 50 },
        // load
        {duration: '2s', target: 50 },
        // ramp down
        {duration: '5s', target: 0 },
    ],

    thresholds: {
        http_req_failed: ['rate < 0.01']
    }
}

const userCsv = new SharedArray('Read csv file:', function() {
    return papaparse.parse(open('./data/users-login.csv'), { header: true }).data;
})

// vu code
export default function() {
    const BASE_URL = 'https://test-api.k6.io'
    const USERNAME = userCsv[Math.floor(Math.random() * userCsv.length)].username
    const PASSWORD = 'password456'

    const res = http.post(`${BASE_URL}/auth/token/login/`, {
        username: USERNAME,
        password: PASSWORD
    });
    
    console.log(res.request.body)
    console.log(res.status)
    console.log(res.body)

    check(res, {
        'Status code should be 200': (r) => r.status === 200,
        'Token was successfully created': (r) => r.json('acess') !== ''
    });
}

// teardown code
export function teardown() {
    console.log('Test has finished!')
}

