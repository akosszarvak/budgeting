import React, { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Spinner";
import { ledgerCalls } from "../api/ledgerCalls";

function Dashboard() {
  const { user } = useAuthContext();
  const {
    isLoading,
    isError,
    data: ledgers,
    error,
  } = useQuery({
    queryKey: ["ledgers"],
    queryFn: () => {
      return ledgerCalls.getLedgers();
    },
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  console.log("ledgers ", ledgers);
  return (
    <div>
      Dashboard{" "}
      {ledgers.map((ledger) => (
        <li key={ledger.id}> hi {ledger.name}</li>
      ))}
    </div>
  );
}

export default Dashboard;
