const { test, expect } = require("playwright/test");
const { installMockSupabase } = require("./helpers/mock-supabase");

test("course shell shows no learner-facing Gist sync UI", async ({ browser, baseURL }) => {
    const context = await browser.newContext();
    await installMockSupabase(context);

    const page = await context.newPage();
    await page.goto(`${baseURL}/course.html?subject=claude-code`);

    await expect(page.locator('text=Connect GitHub Gist Sync')).toHaveCount(0);
    await expect(page.locator('text=GitHub Personal Access Token')).toHaveCount(0);
    await expect(page.locator('text=Not connected')).toHaveCount(0);
    await expect(page.locator('text=Sync')).toHaveCount(0);

    await context.close();
});
