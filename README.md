# Grafana k6

Grafana k6 is an open-source load testing tool that makes it easy to run performance tests on your applications. It is designed to be easy to use, extensible, and efficient.

## Load test types

Many things can go wrong when a system is under load. The system must run numerous operations simultaneously and respond to different requests from a variable number of users. To prepare for these performance risks, teams use load testing.

But a good load-testing strategy requires more than just executing a single script. Different patterns of traffic create different risk profiles for the application. For comprehensive preparation, teams must test the system against different test types.

### Different tests for different goals

Start with smoke tests, then progress to higher loads and longer durations.
The main types are as follows. Each type has its own article outlining its essential concepts.

- <b>Smoke tests:</b>
  validate that your script works and that the system performs adequately under minimal load.

- <b>Average-load:</b>
  test assess how your system performs under expected normal conditions.

- <b>Stress tests:</b>
  assess how a system performs at its limits when load exceeds the expected average.

- <b>Soak tests:</b>
  assess the reliability and performance of your system over extended periods.

- <b>Spike tests:</b>
  validate the behavior and survival of your system in cases of sudden, short, and massive increases in activity.

- <b>Breakpoint tests:</b>
  gradually increase load to identify the capacity limits of the system.

## Best Practices for Load Testing
Load testing is not just about pushing systems to their limits; it’s about understanding their behavior under realistic scenarios. A structured approach ensures reliable results and adds real value. With that in mind, here are the essential guidelines to follow:

- <b>Have a Clear Test Plan:</b> 
    Define the scope, goals (e.g., stability, scalability), and target endpoints.

- <b>Understand the System:</b> 
    Analyze architecture, peak traffic, load duration, and any rate limits or constraints.Inform Stakeholders: Notify relevant teams about the testing schedule and potential impacts, like slower response times.

- <b>Avoid Testing on Production:</b> 
    Test in a dedicated environment to prevent disruptions to live systems.

- <b>Start Small, Scale Gradually:</b> 
    Begin with a low load to establish a baseline, then incrementally increase load.

- <b>Analyze and Present Results:</b> 
    Use dashboards or reports to track response times, resource usage, and error rates, and share insights and improvement recommendations.  

## Installation

To install k6, you can follow the instructions below:

#### Via Homebrew (macOS)

```sh
brew install k6
``` 

#### Other ways to Install

To get another ways to install k6 check </br>
- https://grafana.com/docs/k6/latest/set-up/install-k6/#install-k6

## Test Lifecycle

In the lifecycle of a k6 test, a script always runs through these stages in the same order:

- Code in the init context prepares the script, loading files, importing modules, and defining the test lifecycle functions. <i>Required</i>
- The setup function runs, setting up the test environment and generating data. <i>Optional</i>
- VU code runs in the default or scenario function, running for as long and as many times as the options define. <i>Required</i>
- The teardown function runs, postprocessing data and closing the test environment. <i>Optional</i>
 
<b>Ex:</b>
```sh
 // 1. init code
 import http from 'k6/http';

// 2. setup code
export const options {
  // Code here
}

// 3. VU code
export default function (data) {
  // Code here
}

// 4. teardown code
export function teardown(data) {
  // Code here
}
```

To get more about k6 structure scripts, check: </br> 
- https://grafana.com/docs/k6/latest/using-k6/test-lifecycle/#test-lifecycle 

## Execution

#### Run the test script with the commands:
```sh
k6 run check-status-code-with-threshold.js
```

#### Run with envs:
```sh
k6 run -e URL=https://test-api.k6.io/public/crocodiles/1 scripts/check-status-code-with-env.js --duration 5s --vus 10
```

#### Run with dashboard:
```sh
K6_WEB_DASHBOARD=true k6 run -e URL=https://test-api.k6.io/public/crocodiles/1 scripts/check-status-code-with-env.js --duration 5s --vus 10
```

or 
```sh
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=./reports/report-full.html k6 run -e URL=https://test-api.k6.io/public/crocodiles/1 scripts/check-status-code-with-env.js --duration 5s --vus 10
```

#### Run in Grafana Cloud

```sh
k6 cloud login --token <TOKEN>
```

```sh
k6 cloud scripts/script_name.js 
```

#### Run in AWS Cloud

- Configure `buildspec.yml` file on the root path;
- Upload code to your GitHub Repository;
- Log on your AWS Account;
- Select CodeBuild Service;
- Create a Project;
- Run Project;
- Analyses the results;

#### Run in GitHub Actions

```sh
k6 cloud login --token <TOKEN>
```

```sh
k6 cloud scripts/script_name.js 
```

#### Run Web Applications Perfomance Test - Type Browser

```sh
K6_BROWSER_HEADLESS=false k6 run scripts/web-application-perfomance-browser-test.js
```

#### Run Web Applications Perfomance Test - Type Hybrid (Browser and Protocol)

```sh
K6_BROWSER_HEADLESS=true k6 run scripts/web-application-perfomance-hybrid-browser-and-protocol-test.js
```

## Report and Dashboard
#### Using `K6_WEB_DASHBOARD flag`
- The dashboard will be available on http://127.0.0.1:5665/ address during the tes execution

#### Using `handleSummary() function` on the script example check-status-code-with-report
- The report will be available on `reports` folder

## Extras
To perform code analysis using ESLint, run the commands:

#### Install node modules
```sh
npm install
```

#### Check warnings on code
```sh
npm run lint
```

#### Fix all of warnings on code
```sh
npm run lint:fix
```

### Links
- [K6 version](https://grafana.com/docs/k6/latest/)
- [K6 test types](https://grafana.com/docs/k6/latest/testing-guides/test-types/#different-tests-for-different-goals/)
- [K6 features](https://grafana.com/docs/k6/latest/using-k6/)
- [K6 JS libs](https://jslib.k6.io/)
- [K6 Test API](https://test-api.k6.io/)
- [K6 Executors](https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/)
- [K6 Report](https://github.com/benc-uk/k6-reporter/)
- [ESLint](https://eslint.org/docs/latest/use/configure/rules/)
- [K6 GitHub Actions](https://github.com/marketplace/actions/run-grafana-k6-tests/)
- [k6 Web Application Perfomance Tests](https://k6.io/hybrid-performance-testing/)
- [k6 Core Web Vitals](https://web.dev/explore/learn-core-web-vitals?hl=pt-br)