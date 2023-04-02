import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useQueries, useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "../components/Spinner";
import LedgerRow from "../components/LedgerRow";
import AddLedger from "../components/AddLedger";
import { ledgerCalls } from "../api/ledgerCalls";
import { categoryCalls } from "../api/categoryCalls";

function Dashboard() {
  const [showAddLedgerRow, setShowAddLedgerRow] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useAuthContext();

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
    <div className="pt-8">
      <div className="flex h-20 justify-between gap-4 rounded-xl bg-blue-200 p-3 text-left align-middle">
        <div className="">
          <h2 className="text-3xl text-blue-900">
            {parseInt(balanceQuery.data[0].income) -
              parseInt(balanceQuery.data[0].expense)}{" "}
            HUF
          </h2>
          <p className="text-xs  text-blue-500">Current balance</p>
        </div>
        <div className="">
          <h2 className="text-3xl text-green-700">
            {balanceQuery.data[0].income} HUF
          </h2>
          <p className="text-xs text-blue-500">Income</p>
        </div>
        <div className="">
          <h2 className="text-3xl text-red-700">
            {balanceQuery.data[0].expense} HUF
          </h2>
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

export default Dashboard;
