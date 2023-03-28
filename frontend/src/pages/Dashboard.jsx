import React, { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

function Dashboard() {
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchBalance = async () => {
      // get user's balance - placeholder until react query added
      const response = await fetch("/api/balance", {
        headers: {
          "Authorization": `Bearer ${user.token}`,
        },
      });
      return (json = await response.json());
    };
    if (user) {
      fetchBalance();
    }
  }, [user]);
  return <div>Dashboard</div>;
}

export default Dashboard;
