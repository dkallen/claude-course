const { test, expect } = require("playwright/test");
const { installMockSupabase } = require("./helpers/mock-supabase");

async function openModuleOverview(page, moduleName) {
    await page.locator('.module-item', { hasText: moduleName }).click();
    await expect(page.locator('.module-content h2')).toContainText(moduleName);
}

test("resource pages remain the only editable note surface and reload from Supabase", async ({ browser, baseURL }) => {
    const context = await browser.newContext();
    await installMockSupabase(context);

    const resourcePage = await context.newPage();
    await resourcePage.goto(`${baseURL}/subjects/claude-code/module-4-exercise.html`);
    await resourcePage.locator('#nw-btn').click();

    const noteText = `resource-note ${Date.now()}`;
    await resourcePage.locator('#nw-textarea').fill(noteText);
    await expect(resourcePage.locator('#nw-saved')).toHaveText('Saved');

    await resourcePage.reload();
    await resourcePage.locator('#nw-btn').click();
    await expect(resourcePage.locator('#nw-textarea')).toHaveValue(noteText);

    const coursePage = await context.newPage();
    await coursePage.goto(`${baseURL}/course.html?subject=claude-code`);
    await openModuleOverview(coursePage, 'Idea Refinement');

    const exerciseItem = coursePage.locator('.mc-resource-wrap', {
        has: coursePage.locator('.mc-res-name', { hasText: 'Guided Exercise' })
    });
    await expect(exerciseItem.locator('.mc-note-text')).toHaveText(noteText);
    await expect(coursePage.locator('.module-content textarea')).toHaveCount(0);

    await context.close();
});
