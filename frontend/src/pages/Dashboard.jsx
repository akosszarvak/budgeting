import React, { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Spinner";

function Dashboard() {
  const { user } = useAuthContext();
  // const { isLoading, data: ledgers } = useQuery("ledgers");

  // useEffect(() => {
  //   const fetchBalance = async () => {
  //     // get user's balance - placeholder until react query added
  //     const response = await fetch("/api/balance", {
  //       headers: {
  //         "Authorization": `Bearer ${user.token}`,
  //       },
  //     });
  //     return (json = await response.json());
  //   };
  //   if (user) {
  //     fetchBalance();
  //   }
  // }, [user]);
  return <div>{<>Dashboard</>}</div>;
}

export default Dashboard;
