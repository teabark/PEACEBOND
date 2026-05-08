import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastContext = createContext(null);

const toastStyles = {
  error: "border-red-200 bg-red-50 text-red-900",
  info: "border-blue-200 bg-blue-50 text-blue-950",
  success: "border-green-200 bg-green-50 text-green-950",
  warning: "border-yellow-200 bg-yellow-50 text-yellow-950",
};

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((toastId) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== toastId));
  }, []);

  const showToast = useCallback(
    ({ duration = 4200, message, title, type = "info" }) => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;

      setToasts((currentToasts) =>
        [
          {
            id,
            message,
            title,
            type,
          },
          ...currentToasts,
        ].slice(0, 4)
      );

      if (duration > 0) {
        window.setTimeout(() => removeToast(id), duration);
      }

      return id;
    },
    [removeToast]
  );

  const value = useMemo(
    () => ({
      removeToast,
      showToast,
    }),
    [removeToast, showToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-4 top-4 z-50 flex flex-col gap-3 sm:left-auto sm:w-96"
      >
        {toasts.map((toast) => (
          <article
            className={`pointer-events-auto rounded-lg border p-4 shadow-lg shadow-earth-soil/10 ${
              toastStyles[toast.type] || toastStyles.info
            }`}
            key={toast.id}
            role={toast.type === "error" ? "alert" : "status"}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">{toast.title}</p>
                {toast.message && (
                  <p className="mt-1 text-sm leading-6 opacity-90">{toast.message}</p>
                )}
              </div>
              <button
                aria-label="Dismiss notification"
                className="rounded-md px-2 py-1 text-xs font-semibold opacity-70 transition hover:bg-white/60 hover:opacity-100"
                onClick={() => removeToast(toast.id)}
                type="button"
              >
                Close
              </button>
            </div>
          </article>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider.");
  }

  return context;
}

export default ToastProvider;
