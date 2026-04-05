const { defineConfig } = require("playwright/test");

module.exports = defineConfig({
    testDir: "./tests/smoke",
    timeout: 30000,
    expect: {
        timeout: 5000
    },
    use: {
        browserName: "chromium",
        baseURL: "http://127.0.0.1:8080",
        headless: true
    },
    webServer: {
        command: "npm start",
        url: "http://127.0.0.1:8080/course.html",
        reuseExistingServer: true,
        timeout: 30000
    }
});
