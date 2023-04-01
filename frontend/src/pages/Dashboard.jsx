import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "../components/Spinner";
import LedgerRow from "../components/LedgerRow";
import AddLedger from "../components/AddLedger";
import { ledgerCalls } from "../api/ledgerCalls";

function Dashboard() {
  const [showAddLedgerRow, setShowAddLedgerRow] = useState(false);
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
    <div className="pt-8">
      <div className="flex h-20 justify-between gap-4 rounded-xl bg-blue-200 p-3 text-left align-middle">
        <div className="">
          <h2 className="text-3xl text-blue-900">2200 HUF</h2>
          <p className="text-xs  text-blue-500">Current balance</p>
        </div>
        <div className="">
          <h2 className="text-3xl text-green-700">2200 HUF</h2>
          <p className="text-xs text-blue-500">Income</p>
        </div>
        <div className="">
          <h2 className="text-3xl text-red-700">2200 HUF</h2>
          <p className="text-xs  text-blue-500">Expenses</p>
        </div>
        <div className="flex h-1/2 bg-blue-200 align-middle">
          <select className="flex bg-blue-200">
            <option value="">Start</option>
          </select>{" "}
          <select className="flex bg-blue-200">
            <option value="">End</option>
          </select>
        </div>
      </div>
      <div className="m-2 rounded-xl border-2 border-gray-300 shadow-sm">
        <div className=" m-auto flex justify-between align-middle">
          <div>
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
          </div>
          <h2>Add New Transaction</h2>

          <button
            onClick={() => setShowAddLedgerRow(!showAddLedgerRow)}
            className="align-left  rounded-xl bg-blue-500 p-2  text-white shadow-md hover:cursor-pointer hover:bg-blue-800 hover:shadow-none"
          >
            +
          </button>
        </div>
        {showAddLedgerRow && <AddLedger addLedger={addLedger} />}
        {ledgers.map((ledger, index) => (
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

export default Dashboard;
