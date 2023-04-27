import React, { Suspense, lazy, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import { useQueries, useMutation, useQueryClient } from "@tanstack/react-query";
import LedgerRow from "../components/LedgerRow";
import { ledgerCalls } from "../api/ledgerCalls";

const AddLedger = lazy(() => import("../components/AddLedger"));
const Spinner = lazy(() => import("../components/Spinner"));

function Transactions() {
  const [showAddLedgerRow, setShowAddLedgerRow] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  const [ledgerQuery] = useQueries({
    queries: [
      {
        queryKey: ["ledgers", user],
        queryFn: (user) => {
          return ledgerCalls.getLedgers(user);
        },
      },
    ],
  });

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
    return <Spinner />;
  }

  if (ledgerQuery.error !== null) {
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
        <Suspense fallback={<div>Loading...</div>}>
          <AddLedger addLedger={addLedger} isShown={showAddLedgerRow} />
        </Suspense>
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
