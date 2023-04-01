import React from "react";

function LedgerRow({ ledger, deleteLedger, index }) {
  const even = index % 2;
  return (
    <div
      key={ledger.id}
      className={`m-3 mx-auto flex w-4/5 items-center justify-between rounded-md border border-gray-400 p-1 align-middle shadow-md hover:bg-gray-200 hover:shadow-none ${
        even === 1 ? "bg-gray-300" : "bg-gray-50"
      }`}
    >
      <div className=" mx-2 w-1/2 py-2 text-left"> 2023 01 01 {index} </div>
      <div className="w-1/2 py-2 text-left">{ledger.name}</div>
      <div className="w-1/2 py-2 text-left">{ledger.amount} HUF</div>
      <div
        className={`w-1/2 py-2 text-left ${
          ledger.trans_type === "EXP" ? "text-red-600" : "text-green-600"
        }`}
      >
        {ledger.trans_type}
      </div>
      <div className="mr-3 w-1/2 py-2 text-right">
        <button
          onClick={() => deleteLedger(ledger.id)}
          className=" rounded-lg bg-red-500 p-1 align-middle text-white shadow-lg hover:cursor-pointer hover:bg-red-800 hover:shadow-none"
        >
          delete
        </button>
      </div>
    </div>
  );
}

export default LedgerRow;
