const { test, expect } = require("playwright/test");
const { installMockSupabaseWithSession } = require("./helpers/mock-supabase");

test("unauthenticated visitors are redirected to login from protected pages", async ({ browser, baseURL }) => {
    const context = await browser.newContext();
    await installMockSupabaseWithSession(context, null);

    const page = await context.newPage();
    await page.goto(`${baseURL}/course.html?subject=claude-code`);

    await expect(page).toHaveURL(/\/login\.html\?/);
    await expect(page.locator("h2")).toContainText("Account access");

    await context.close();
});

test("authenticated visitors can sign out from protected pages", async ({ browser, baseURL }) => {
    const context = await browser.newContext();
    await installMockSupabaseWithSession(context, {
        user: {
            id: "playwright-user",
            email: "playwright@example.com",
            user_metadata: { full_name: "Playwright User" }
        }
    });

    const page = await context.newPage();
    await page.goto(`${baseURL}/course.html?subject=claude-code`);

    await page.locator("#auth-account-toggle").click();
    await page.evaluate(() => {
        document.getElementById("auth-account-signout").click();
    });

    await expect(page).toHaveURL(/\/login\.html\?/);

    await context.close();
});
