const STAFF_SESSION_KEY = "peacebond_staff_session";

export function loginStaff(staff) {
  localStorage.setItem(
    STAFF_SESSION_KEY,
    JSON.stringify({
      staff,
      loggedInAt: new Date().toISOString(),
    })
  );
}

export function logoutStaff() {
  localStorage.removeItem(STAFF_SESSION_KEY);
}

export function isStaffLoggedIn() {
  return Boolean(getStaffUser()?._id);
}

export function getStaffEmail() {
  return getStaffUser()?.email || "staff";
}

export function getStaffName() {
  return getStaffUser()?.name || "staff";
}

export function getStaffUser() {
  const session = localStorage.getItem(STAFF_SESSION_KEY);

  if (!session) {
    return null;
  }

  try {
    return JSON.parse(session).staff || null;
  } catch {
    return null;
  }
}
