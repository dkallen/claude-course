function fakeSupabaseCdnScript(options) {
    var sessionLiteral = JSON.stringify(options && options.session ? options.session : null);

    return `
window.supabase = {
  createClient: function () {
    var authStorageKey = '__mock_supabase_auth_session';
    var seededSession = ${sessionLiteral};
    var authListeners = [];

    function loadSession() {
      try {
        var stored = localStorage.getItem(authStorageKey);
        if (stored) return JSON.parse(stored);
      } catch (error) {}

      if (seededSession) {
        try {
          localStorage.setItem(authStorageKey, JSON.stringify(seededSession));
        } catch (error) {}
      }

      return seededSession;
    }

    function saveSession(session) {
      currentSession = session || null;
      try {
        if (currentSession) {
          localStorage.setItem(authStorageKey, JSON.stringify(currentSession));
        } else {
          localStorage.removeItem(authStorageKey);
        }
      } catch (error) {}
    }

    var currentSession = loadSession();

    function defaultUser() {
      return {
        id: 'playwright-user',
        email: 'playwright@example.com',
        user_metadata: { full_name: 'Playwright User' }
      };
    }

    function activeUser() {
      return currentSession && currentSession.user ? currentSession.user : null;
    }

    function notifyAuth(eventName) {
      authListeners.forEach(function (listener) {
        listener(eventName, currentSession);
      });
    }

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
          return Promise.resolve({ data: { session: currentSession } });
        },
        getUser: function () {
          return Promise.resolve({ data: { user: activeUser() } });
        },
        onAuthStateChange: function (listener) {
          authListeners.push(listener);
          return {
            data: {
              subscription: {
                unsubscribe: function () {
                  authListeners = authListeners.filter(function (candidate) {
                    return candidate !== listener;
                  });
                }
              }
            }
          };
        },
        signInWithPassword: function () {
          saveSession({ user: defaultUser() });
          notifyAuth('SIGNED_IN');
          return Promise.resolve({ data: { user: currentSession.user }, error: null });
        },
        signUp: function () {
          return Promise.resolve({ error: null });
        },
        signInWithOtp: function () {
          return Promise.resolve({ error: null });
        },
        signInWithOAuth: function () {
          return Promise.resolve({ error: null });
        },
        resetPasswordForEmail: function () {
          return Promise.resolve({ error: null });
        },
        updateUser: function () {
          return Promise.resolve({ error: null });
        },
        signOut: function () {
          saveSession(null);
          notifyAuth('SIGNED_OUT');
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
          },
          insert: function (payload) {
            var rows = loadTable(tableName);
            var nextRows = Array.isArray(payload) ? payload : [payload];
            nextRows.forEach(function (nextRow) {
              var inserted = Object.assign({}, nextRow);
              if (tableName === 'user_feedback' && !inserted.created_at) {
                inserted.created_at = new Date().toISOString();
              }
              rows.push(inserted);
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
            body: fakeSupabaseCdnScript({
                session: {
                    user: {
                        id: 'playwright-user',
                        email: 'playwright@example.com',
                        user_metadata: { full_name: 'Playwright User' }
                    }
                }
            })
        });
    });
}

async function installMockSupabaseWithSession(context, session) {
    await context.route('**/@supabase/supabase-js@2*', async route => {
        await route.fulfill({
            contentType: 'application/javascript',
            body: fakeSupabaseCdnScript({ session: session || null })
        });
    });
}

module.exports = {
    installMockSupabase,
    installMockSupabaseWithSession
};
