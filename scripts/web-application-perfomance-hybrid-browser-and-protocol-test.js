import { browser } from 'k6/browser'
import { check } from 'k6'
import http from 'k6/http'
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const BASE_URL = 'https://otel-demo.field-eng.grafana.net/'

export const options = {
    scenarios: {
        browser: {
            executor: 'per-vu-iterations',
            exec: 'browserTest',
            options: {
                browser: {
                    type: 'chromium'
                },
            },
        },
        protocol: {
            executor: 'constant-vus',
            exec: 'procotolTest',
            vus: 20,
            duration: '30s'
        },
    },
    thresholds: {
        checks: ['rate == 1.0'],
        browser_web_vital_fid: ['p(75) <= 100'],
        browser_web_vital_lcp: ['p(75) <= 2500'],
        browser_web_vital_cls: ['p(75) <= 0.01']
    },
    summaryTrendStats: ["min", "med", "avg", "max", "p(75)", "p(95)", "p(99)"] 
};

export async function browserTest() {
    const context = await browser.newContext()
    const page = await context.newPage()

    try {
        await page.goto(BASE_URL)

        const productCard = await page.locator('(//div[@data-cy="product-card"])[1]')

        await Promise.all([
            productCard.click(), page.waitForNavigation()
        ]);

        await page.screenshot({ path: 'screenshots/001-after-product-card-click.png' });

        const quantityOptions = page.locator('//select[@data-cy="product-quantity"]')
        quantityOptions.selectOption('3')

        await page.screenshot({ path: 'screenshots/002-after-product-quantity-selectOption.png' });

        const addToCartBtn = page.locator('//button[@data-cy="product-add-to-cart"]')

        await Promise.all([
            addToCartBtn.click(), page.waitForNavigation()
        ]);

        await page.screenshot({ path: 'screenshots/003-after-product-add-to-cart-click.png' });

        const cartItemNameVisible = await page.locator('//p[text()="National Park Foundation Explorascope"]').isVisible();
        console.log('Cart item name visibility:', cartItemNameVisible);

        const cartItemQuantityVisible = await page.locator('//p[text()="3"]').isVisible();
        console.log('Cart item quantity visibility:', cartItemQuantityVisible);

        check(page, {
            "cart item name":  () => cartItemNameVisible,
            "cart item quantity": () => cartItemQuantityVisible
        });
    }
    finally {
        await page.close();
    }
}

export async function procotolTest() {
    const res = http.get(BASE_URL);

    check(res, {
        'Status code should be 200': (p) => p.status === 200
    })
}

export function handleSummary(data) {
    const currentDateTime = new Date().toLocaleString();
    const reportTitle = `WebSite Example - ${currentDateTime}`;

    return {
        "./reports/report.html": htmlReport(data, { title: reportTitle }),
        stdout: textSummary(data, { indent: " ", enableColors: true })
    };
}