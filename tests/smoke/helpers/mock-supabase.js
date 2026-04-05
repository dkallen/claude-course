function fakeSupabaseCdnScript() {
    return `
window.supabase = {
  createClient: function () {
    function storageKey(tableName) {
      return '__mock_supabase_' + tableName;
    }

    function loadTable(tableName) {
      try {
        var stored = localStorage.getItem(storageKey(tableName));
        return stored ? JSON.parse(stored) : [];
      } catch (error) {
        return [];
      }
    }

    function saveTable(tableName, rows) {
      localStorage.setItem(storageKey(tableName), JSON.stringify(rows || []));
    }

    function rowKey(tableName, row) {
      if (tableName === 'user_notes') {
        return [row.user_id, row.subject_id, row.resource_id].join('::');
      }
      if (tableName === 'user_progress') {
        return [row.user_id, row.subject_id].join('::');
      }
      return JSON.stringify(row);
    }

    function matchesFilters(row, filters) {
      return filters.every(function (filter) {
        return row[filter.column] === filter.value;
      });
    }

    function createQuery(tableName, action) {
      var filters = [];

      function execute(single) {
        var rows = loadTable(tableName);
        if (action === 'select') {
          var selected = rows.filter(function (row) {
            return matchesFilters(row, filters);
          });
          return Promise.resolve({ data: single ? (selected[0] || null) : selected, error: null });
        }

        if (action === 'delete') {
          var remaining = rows.filter(function (row) {
            return !matchesFilters(row, filters);
          });
          saveTable(tableName, remaining);
          return Promise.resolve({ data: null, error: null });
        }

        return Promise.resolve({ data: null, error: null });
      }

      return {
        eq: function (column, value) {
          filters.push({ column: column, value: value });
          return this;
        },
        maybeSingle: function () {
          return execute(true);
        },
        then: function (resolve, reject) {
          return execute(false).then(resolve, reject);
        }
      };
    }

    return {
      auth: {
        getSession: function () {
          return Promise.resolve({ data: { session: { user: { id: 'playwright-user' } } } });
        },
        getUser: function () {
          return Promise.resolve({ data: { user: { id: 'playwright-user' } } });
        },
        onAuthStateChange: function () {
          return { data: { subscription: { unsubscribe: function () {} } } };
        },
        signInWithPassword: function () {
          return Promise.resolve({ data: { user: { id: 'playwright-user' } }, error: null });
        },
        signUp: function () {
          return Promise.resolve({ error: null });
        },
        signInWithOtp: function () {
          return Promise.resolve({ error: null });
        },
        signInWithOAuth: function () {
          return Promise.resolve({ error: null });
        }
      },
      from: function (tableName) {
        return {
          select: function () {
            return createQuery(tableName, 'select');
          },
          delete: function () {
            return createQuery(tableName, 'delete');
          },
          upsert: function (payload) {
            var rows = loadTable(tableName);
            var nextRows = Array.isArray(payload) ? payload : [payload];

            nextRows.forEach(function (nextRow) {
              var key = rowKey(tableName, nextRow);
              var existingIndex = rows.findIndex(function (row) {
                return rowKey(tableName, row) === key;
              });
              if (existingIndex >= 0) {
                rows[existingIndex] = Object.assign({}, rows[existingIndex], nextRow);
              } else {
                rows.push(Object.assign({}, nextRow));
              }
            });

            saveTable(tableName, rows);
            return Promise.resolve({ data: payload, error: null });
          }
        };
      }
    };
  }
};`;
}

async function installMockSupabase(context) {
    await context.route('**/@supabase/supabase-js@2*', async route => {
        await route.fulfill({
            contentType: 'application/javascript',
            body: fakeSupabaseCdnScript()
        });
    });
}

module.exports = {
    installMockSupabase
};
