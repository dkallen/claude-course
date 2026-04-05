// Note helpers shared between course.html and Node tests.
// In the browser, these are available on window.courseNotes.
// In Node, they are importable via require().

function mapNoteRows(rows) {
    const mapped = {};
    (rows || []).forEach(function(row) {
        if (!row || !row.resource_id) return;
        mapped[row.resource_id] = row.content || "";
    });
    return mapped;
}

function getResourceNote(notes, resource) {
    if (!resource || !resource.id) return "";
    return (notes && notes[resource.id]) || "";
}

function buildModuleNoteGroups(module, notes, emptyText) {
    const fallbackText = emptyText || "No notes available";
    const resources = module && Array.isArray(module.resources) ? module.resources : [];

    return resources.map(function(resource) {
        const noteText = getResourceNote(notes, resource);
        const trimmed = noteText.trim();
        return {
            resource,
            text: trimmed ? noteText : fallbackText,
            isEmpty: !trimmed
        };
    });
}

function buildAllModuleNoteGroups(modules, notes, emptyText) {
    return (modules || [])
        .filter(function(module) {
            return module && Array.isArray(module.resources) && module.resources.length > 0;
        })
        .map(function(module) {
            return {
                module,
                items: buildModuleNoteGroups(module, notes, emptyText)
            };
        });
}

const exported = {
    mapNoteRows,
    getResourceNote,
    buildModuleNoteGroups,
    buildAllModuleNoteGroups
};

if (typeof window !== "undefined") {
    window.courseNotes = exported;
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = exported;
}
