// init
import http from 'k6/http'

// setup
export const options = {
    scenarios: {
        listar: {
            executor: 'constant-arrival-rate',
            exec: 'listar',
            duration: '30s',
            rate: 200,
            timeUnit: '1s',
            preAllocatedVUs: 150,
            gracefulStop: '10s',
            tags: {test_type: 'list_crocodiles'}
        },
        buscar: {
            executor: 'per-vu-iterations',
            exec: 'buscar',
            vus: 50,
            iterations: 20,
            maxDuration: '1m',
            gracefulStop: '10s',
            tags: {test_type: 'find_crocodile_by_id'}
        }
    }
}

// vu code
export function listar() {
    http.get(__ENV.URL+'/crocodiles');
}

export function buscar() {
    if( __VU % 2 === 0){
        http.get(__ENV.URL+'/crocodiles/2');
    }
    else {
        http.get(__ENV.URL+'/crocodiles/1');
    }
}

// teardown code
export function teardown() {
    console.log('Test has finished!')
}
