import React, { Suspense, lazy, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import { useQueries, useMutation, useQueryClient } from "@tanstack/react-query";
import LedgerRow from "../components/LedgerRow";
import { ledgerCalls } from "../api/ledgerCalls";
import { useMemo } from "react";

const AddLedger = lazy(() => import("../components/AddLedger"));
const Spinner = lazy(() => import("../components/Spinner"));

const getBalance = (data, key) => {
  if (!data || data.length < 1) {
    return 0;
  }

  const balance = parseFloat(data[0][key]);

  if (isNaN(balance)) {
    return 0;
  }

  return balance;
};

function Dashboard() {
  const [showAddLedgerRow, setShowAddLedgerRow] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

  const [ledgerQuery, balanceQuery] = useQueries({
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

  const income = useMemo(
    () => getBalance(balanceQuery.data, "income"),
    [balanceQuery]
  );

  const expense = useMemo(
    () => getBalance(balanceQuery.data, "expense"),
    [balanceQuery]
  );

  if ([ledgerQuery.isLoading, balanceQuery.isLoading].includes(true)) {
    return <Spinner />;
  }

  return (
    <div className="pt-8">
      <div className="flex justify-between gap-4 p-3 text-left align-middle">
        <div className=" bg-blue-200 ">
          <h2 className="text-3xl text-blue-900 ">
            {`${income - expense} HUF`}
          </h2>
          <p className="text-xs text-blue-500">Current balance</p>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-lg text-green-700">{income} HUF</h2>
          <p className="text-xs text-blue-500">Income</p>{" "}
          <h2 className="text-lg text-red-700">{expense} HUF</h2>
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

export default Dashboard;
