import { useEffect, useState } from "react";

function getConnectionDetails() {
  if (typeof navigator === "undefined") {
    return {
      downlink: null,
      effectiveType: "",
      saveData: false,
    };
  }

  const connection =
    navigator.connection || navigator.mozConnection || navigator.webkitConnection || {};

  return {
    downlink: typeof connection.downlink === "number" ? connection.downlink : null,
    effectiveType: connection.effectiveType || "",
    saveData: Boolean(connection.saveData),
  };
}

function getConnectivityState() {
  const isOnline = typeof navigator === "undefined" ? true : navigator.onLine;
  const connection = getConnectionDetails();
  const slowConnection =
    connection.saveData ||
    ["slow-2g", "2g"].includes(connection.effectiveType) ||
    (connection.downlink !== null && connection.downlink > 0 && connection.downlink < 0.8);

  return {
    ...connection,
    isLimited: isOnline && slowConnection,
    isOffline: !isOnline,
    isOnline,
  };
}

function useConnectivity() {
  const [connectivity, setConnectivity] = useState(() => getConnectivityState());

  useEffect(() => {
    function updateConnectivity() {
      setConnectivity(getConnectivityState());
    }

    const connection =
      navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    window.addEventListener("online", updateConnectivity);
    window.addEventListener("offline", updateConnectivity);
    connection?.addEventListener?.("change", updateConnectivity);

    return () => {
      window.removeEventListener("online", updateConnectivity);
      window.removeEventListener("offline", updateConnectivity);
      connection?.removeEventListener?.("change", updateConnectivity);
    };
  }, []);

  return connectivity;
}

export default useConnectivity;
