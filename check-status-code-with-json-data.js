// init
import http from 'k6/http'
import { check } from 'k6'
import { SharedArray } from 'k6/data'

// setup
export const options = {
    stages: [
        // ramp up
        {duration: '5s', target: 5 },
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

const userData = new SharedArray('Read user login data:', function() {
    return JSON.parse(open('./data/users-login.json')).users
})

// vu code
export default function() {
    const BASE_URL = 'https://test-api.k6.io'

    const userLogin = userData[Math.floor(Math.random() * userData.length)]

    const res = http.post(`${BASE_URL}/auth/token/login/`, JSON.stringify(userLogin), {
        headers: { 'Content-Type': 'application/json' }
    });

    console.log(userLogin)
    console.log(res.status)
    console.log(res.body)

    check(res, {
        'Status code should be 200': (r) => r.status === 200
    });
}

// teardown code
export function teardown() {
    console.log('Test has finished!')
}
