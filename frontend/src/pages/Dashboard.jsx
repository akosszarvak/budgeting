import React, { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "../components/Spinner";
import { ledgerCalls } from "../api/ledgerCalls";

function Dashboard() {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  const {
    isLoading,
    isError,
    data: ledgers,
    error,
  } = useQuery({
    queryKey: ["ledgers", user],
    queryFn: (user) => {
      return ledgerCalls.getLedgers(user);
    },
  });

  const updatedLedger = {
    "category_id": "cb9b35e0-7de3-45eb-8368-7dddf3b265f6",
    "name": "this is a new a ledger",
    "trans_type": "INC",
    "amount": 3000,
    "note": "nothing to see here",
  };

  // const { mutate: updateLedger } = useMutation(
  //   (updatedLedger) => ledgerCalls.updatesLedger(updatedLedger),
  //   {
  //     onSettled: () => {
  //       queryClient.invalidateQueries(["ledgers"]);
  //     },
  //   }
  // );

  const { mutate: addLedger } = useMutation(
    (updatedLedger) => ledgerCalls.addLedger(updatedLedger, user),
    {
      onSettled: () => {
        queryClient.invalidateQueries(["ledgers"]);
      },
    }
  );

  const { mutate: deleteLedger } = useMutation(
    (ledgerId) => ledgerCalls.deleteLedger(ledgerId, user),
    {
      onSettled: () => {
        queryClient.invalidateQueries(["ledgers"]);
      },
    }
  );

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
        <li key={ledger.id} style={{ listStyle: "none" }}>
          {" "}
          -- {ledger.name}
          {/* <button onClick={updateLedger(updatedLedger)}>update</button> */}
          <button
            onClick={() => deleteLedger(ledger.id)}
            style={{
              backgroundColor: "red",
              border: "2px solid black",
              color: "white",
              margin: "5px 2px",
            }}
          >
            delete
          </button>
        </li>
      ))}
      <button
        onClick={() => addLedger(updatedLedger)}
        style={{
          backgroundColor: "blue",
          border: "5px solid blue",
          color: "white",
          margin: "5px 2px",
        }}
      >
        Add Ledger
      </button>
    </div>
  );
}

export default Dashboard;
