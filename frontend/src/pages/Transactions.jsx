import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import { useQueries, useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "../components/Spinner";
import LedgerRow from "../components/LedgerRow";
import AddLedger from "../components/AddLedger";
import { ledgerCalls } from "../api/ledgerCalls";
import { categoryCalls } from "../api/categoryCalls";

function Transactions() {
  const [showAddLedgerRow, setShowAddLedgerRow] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  // const { isLoading, data: ledgers } = useQuery("ledgers");

  const [ledgerQuery, balanceQuery, categoryQuery] = useQueries({
    queries: [
      {
        queryKey: ["ledgers", user],
        queryFn: (user) => {
          return ledgerCalls.getLedgers(user);
        },
      },
      {
        queryKey: ["balance", user],
        queryFn: (user) => {
          return ledgerCalls.getBalance(user);
        },
      },
      {
        queryKey: ["categories", user],
        queryFn: (user) => {
          return categoryCalls.getCategories(user);
        },
      },
    ],
  });

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
        queryClient.invalidateQueries(["balance"]);
      },
    }
  );

  const { mutate: deleteLedger } = useMutation(
    (ledgerId) => ledgerCalls.deleteLedger(ledgerId, user),
    {
      onSettled: () => {
        queryClient.invalidateQueries(["ledgers"]);
        queryClient.invalidateQueries(["balance"]);
      },
    }
  );

  if (ledgerQuery.isLoading) {
    return <span>Loading...</span>;
  }
  if (balanceQuery.isLoading) {
    return <span>Loading...</span>;
  }
  if (categoryQuery.isLoading) {
    return <span>Loading...</span>;
  }

  if (ledgerQuery.isError) {
    return <span>Error: {error.message}</span>;
  }
  if (balanceQuery.isError) {
    return <span>Error: {error.message}</span>;
  }

  if (categoryQuery.isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="my-3 pt-5 pb-4">
      <div className="border-1 m-2 rounded-xl border-gray-300 shadow-sm">
        <div className="mx-4 flex justify-end p-3">
          {/* <div>
            Sort by{" "}
            <select>
              <option key="date" value="date">
                Date
              </option>
              ,
              <option key="low" value="low">
                Amount (low to high)
              </option>
              ,
              <option key="high" value="high">
                Amount (high to low)
              </option>
              ,
            </select>
          </div> */}
          <div className="flex justify-end gap-3 ">
            <h2>Add New Transaction</h2>

            <button
              onClick={() => setShowAddLedgerRow(!showAddLedgerRow)}
              className="align-left  rounded-xl bg-blue-500 p-2  text-white shadow-md hover:cursor-pointer hover:bg-blue-800 hover:shadow-none"
            >
              +
            </button>
          </div>
        </div>
        {showAddLedgerRow && (
          <AddLedger addLedger={addLedger} categories={categoryQuery.data} />
        )}
        {ledgerQuery.data.map((ledger, index) => (
          <LedgerRow
            ledger={ledger}
            deleteLedger={deleteLedger}
            key={ledger.id}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Transactions;
