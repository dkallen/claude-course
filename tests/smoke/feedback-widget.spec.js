const { test, expect } = require('playwright/test');
const { installMockSupabase } = require('./helpers/mock-supabase');

test('resource-page feedback widget writes contextual feedback to Supabase', async ({ browser, baseURL }) => {
    const context = await browser.newContext();
    await installMockSupabase(context);

    const page = await context.newPage();
    await page.goto(`${baseURL}/subjects/claude-code/module-4-exercise.html`);

    await page.locator('#fw-btn').click();
    await page.locator('#fw-up').click();
    await page.locator('#fw-comment').fill('This exercise was especially useful.');
    await page.locator('#fw-submit').click();

    await expect(page.locator('#fw-status')).toHaveText('Thanks for the feedback.');
    await expect(page.locator('#fw-submit')).toBeDisabled();

    const rows = await page.evaluate(() => {
        const stored = localStorage.getItem('__mock_supabase_user_feedback');
        return stored ? JSON.parse(stored) : [];
    });

    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({
        subject_id: 'claude-code',
        module: '4',
        resource_id: 'm4-exercise',
        rating: 1,
        comment: 'This exercise was especially useful.',
        author_display_name: 'Playwright User'
    });

    await context.close();
});
