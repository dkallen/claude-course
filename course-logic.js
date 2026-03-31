// Pure logic functions shared between course.html (browser) and tests (Node).
// In the browser, these become globals via <script> tag.
// In Node, they are importable via require().

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function resourceKey(moduleNum, idx) {
    return "r" + moduleNum + "-" + idx;
}

function moduleKey(num) {
    return "m" + num;
}

function storageKey(prefix) {
    return prefix + "-progress";
}

function calculateProgress(modules, progress) {
    const total = modules.length;
    const done = modules.filter(function(module) {
        return !!progress[moduleKey(module.num)];
    }).length;
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    return { done: done, total: total, percent: percent };
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = { escapeHtml, resourceKey, moduleKey, storageKey, calculateProgress };
}
