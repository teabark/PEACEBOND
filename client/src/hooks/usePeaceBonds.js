import { useEffect, useState } from "react";
import { getPeaceBonds } from "../utils/api.js";
import { getStaffUser } from "../utils/auth.js";

function usePeaceBonds() {
  const staffUser = getStaffUser();
  const [peaceBonds, setPeaceBonds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadPeaceBonds() {
    if (!staffUser?._id) {
      setIsLoading(false);
      setError("No logged-in staff user found.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      const staffPeaceBonds = await getPeaceBonds(staffUser._id);
      setPeaceBonds(staffPeaceBonds);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Could not load PeaceBond data. Please check the backend connection."
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadPeaceBonds();
  }, [staffUser?._id]);

  return {
    error,
    isLoading,
    loadPeaceBonds,
    peaceBonds,
    staffUser,
  };
}

export default usePeaceBonds;
