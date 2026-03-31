const TOKEN_KEY = "techalfa_token";
const USER_KEY = "techalfa_user";
const PENDING_AUTH_KEY = "techalfa_pending_auth";

export function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function isAuthenticated() {
  return Boolean(getAuthToken());
}

export function saveAuthSession({ token, user }) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function updateStoredUser(updater) {
  const currentUser = getStoredUser();
  if (!currentUser) {
    return null;
  }

  const nextUser = typeof updater === "function" ? updater(currentUser) : { ...currentUser, ...updater };
  localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
  return nextUser;
}

export function clearAuthSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getStoredUser() {
  const rawUser = localStorage.getItem(USER_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
}

export function savePendingAuth(data) {
  localStorage.setItem(PENDING_AUTH_KEY, JSON.stringify(data));
}

export function getPendingAuth() {
  const rawPendingAuth = localStorage.getItem(PENDING_AUTH_KEY);

  if (!rawPendingAuth) {
    return null;
  }

  try {
    return JSON.parse(rawPendingAuth);
  } catch {
    localStorage.removeItem(PENDING_AUTH_KEY);
    return null;
  }
}

export function clearPendingAuth() {
  localStorage.removeItem(PENDING_AUTH_KEY);
}
