const SYNC_PENDING_KEY = "peacebond_sync_pending";

export const CASE_DRAFT_KEY = "peacebond_case_creation_draft";

export function getCompletionReportDraftKey(peaceBondId) {
  return `peacebond_completion_report_draft_${peaceBondId || "unknown"}`;
}

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function emitOfflineStateChange() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("peacebond:offline-state-change"));
  }
}

export function readLocalDraft(key, fallback = {}) {
  if (!canUseStorage()) {
    return fallback;
  }

  try {
    const rawDraft = window.localStorage.getItem(key);
    return rawDraft ? JSON.parse(rawDraft) : fallback;
  } catch {
    return fallback;
  }
}

export function saveLocalDraft(key, draft) {
  if (!canUseStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(
      key,
      JSON.stringify({
        ...draft,
        savedAt: new Date().toISOString(),
      })
    );
    emitOfflineStateChange();
  } catch {
    // Local draft persistence should never interrupt staff work.
  }
}

export function clearLocalDraft(key) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(key);
  emitOfflineStateChange();
}

export function hasMeaningfulDraftValue(draft, keys) {
  return keys.some((key) => {
    const value = draft?.[key];

    if (typeof value === "boolean") {
      return value;
    }

    return typeof value === "string" ? value.trim().length > 0 : Boolean(value);
  });
}

export function markSyncPending(reason = "local changes") {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(
    SYNC_PENDING_KEY,
    JSON.stringify({
      pending: true,
      reason,
      updatedAt: new Date().toISOString(),
    })
  );
  emitOfflineStateChange();
}

export function clearSyncPending() {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(SYNC_PENDING_KEY);
  emitOfflineStateChange();
}

export function getSyncPending() {
  if (!canUseStorage()) {
    return null;
  }

  try {
    const rawPendingState = window.localStorage.getItem(SYNC_PENDING_KEY);
    return rawPendingState ? JSON.parse(rawPendingState) : null;
  } catch {
    return null;
  }
}

export function isLikelyOfflineError(error) {
  return (
    (typeof navigator !== "undefined" && !navigator.onLine) ||
    error?.code === "ERR_NETWORK" ||
    error?.message === "Network Error" ||
    (!error?.response && Boolean(error?.request))
  );
}
