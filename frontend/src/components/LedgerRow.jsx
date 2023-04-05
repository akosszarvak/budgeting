import React from "react";
import { format } from "date-fns";

function LedgerRow({ ledger, deleteLedger, index }) {
  const even = index % 2;
  return (
    <div
      key={ledger.id}
      className={`border-bottom mx-10 my-3 flex items-center justify-between rounded-md border-gray-400 px-3 py-1 align-middle shadow-md hover:bg-blue-200 hover:shadow-none ${
        even === 1 ? "bg-blue-100" : "bg-gray-50"
      }`}
    >
      <div className="flex w-full flex-col py-2">
        <div className="w-1/2 py-2 text-left font-semibold">{ledger.name}</div>
        <div className=" w-full  text-left text-xs text-gray-500">
          {" "}
          {format(new Date(ledger.created_at), "yyyy-MM-dd HH")}:00
        </div>
      </div>
      <div className="mr-3 w-1/6 py-2 text-left text-xs ">
        {ledger.category}
      </div>
      <div className="w-1/4 py-2 text-left font-semibold">
        {ledger.amount} HUF
      </div>
      <div
        className={`w-1/6 py-1 text-left font-semibold ${
          ledger.trans_type === "EXP" ? "text-red-500" : "text-green-500"
        }`}
      >
        {ledger.trans_type}
      </div>
      <div className="w-1/2 py-2 text-left text-sm">{ledger.note}</div>
      <div className="mr-3 py-2 text-right">
        <button
          onClick={() => deleteLedger(ledger.id)}
          className=" rounded-lg bg-red-600 p-1 align-middle text-white shadow-lg hover:cursor-pointer hover:bg-red-800 hover:shadow-none"
        >
          delete
        </button>
      </div>
    </div>
  );
}

export default LedgerRow;
