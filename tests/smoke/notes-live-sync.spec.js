const { test, expect } = require("playwright/test");
const { installMockSupabase } = require("./helpers/mock-supabase");

async function openModuleOverview(page, moduleName) {
    await page.locator('.module-item', { hasText: moduleName }).click();
    await expect(page.locator('.module-content h2')).toContainText(moduleName);
}

test("already-open module overview updates after a resource-page note save in another tab", async ({ browser, baseURL }) => {
    const context = await browser.newContext();
    await installMockSupabase(context);

    const coursePage = await context.newPage();
    await coursePage.goto(`${baseURL}/course.html?subject=claude-code`);
    await openModuleOverview(coursePage, 'Idea Refinement');

    const exerciseItem = coursePage.locator('.mc-resource-wrap', {
        has: coursePage.locator('.mc-res-name', { hasText: 'Guided Exercise' })
    });
    await expect(exerciseItem.locator('.mc-note-text')).toHaveText('No notes available');

    const resourcePage = await context.newPage();
    await resourcePage.goto(`${baseURL}/subjects/claude-code/module-4-exercise.html`);
    await resourcePage.locator('#nw-btn').click();

    const noteText = `live-sync ${Date.now()}`;
    await resourcePage.locator('#nw-textarea').fill(noteText);
    await expect(resourcePage.locator('#nw-saved')).toHaveText('Saved');

    await coursePage.bringToFront();
    await expect(exerciseItem.locator('.mc-note-text')).toHaveText(noteText);
    await expect(coursePage.locator('.module-content textarea')).toHaveCount(0);

    await context.close();
});
