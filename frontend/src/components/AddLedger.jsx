import React, { useState } from "react";
import { toast } from "react-toastify";

function AddLedger({ addLedger, categories }) {
  const [formData, setFormData] = useState({
    category_id: categories[0].id,
    name: "",
    trans_type: "INC",
    amount: 0,
    note: "",
  });

  const { category_id, name, trans_type, amount, note } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(formData);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("FORM DATA", formData);
    if (name === "") {
      toast.error("Please add a name for the transaction");
    } else if (amount === 0 || amount < 0 || amount === "") {
      toast.error("Please provide a positive number for the transaction");
    } else {
      try {
        await addLedger(formData);
        setFormData((prevState) => ({
          ...prevState,
          name: "",
          amount: 0,
          note: "",
        }));
      } catch (err) {
        console.log(err);
        if (!err?.response) {
          toast.error("No server response");
        } else {
          toast.error("Action failed");
        }
      }
    }
  };

  return (
    <div className="mx-10 my-5 flex  items-center justify-between rounded-md border border-gray-300 bg-gray-100  p-3 align-middle shadow-md">
      <form onSubmit={onSubmit} className="flex w-full justify-between gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-gray-600">category</label>
          <select
            className=" h-10 w-full rounded border px-3 py-1 leading-tight text-gray-700 shadow focus:outline-none"
            value={category_id}
            name="category_id"
            onChange={onChange}
          >
            {categories.map((category) => (
              <option key={category.name} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-600">name</label>
          <input
            className="focus:shadow-outline h-10 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder=" enter transaction name"
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-600">amount</label>
          <input
            className="focus:shadow-outline h-10 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            type="number"
            id="amount"
            name="amount"
            value={amount}
            placeholder="enter transaction's amount"
            onChange={onChange}
          />{" "}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-600">note</label>
          <input
            className="focus:shadow-outline h-10 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            type="text"
            id="note"
            name="note"
            value={note}
            placeholder=" write a note"
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-600">type</label>
          <select
            className=" h-10 w-full rounded border px-3 py-1 leading-tight text-gray-700 shadow focus:outline-none"
            value={trans_type}
            name="trans_type"
            onChange={onChange}
          >
            <option key="INC" value="INC">
              Income
            </option>
            <option key="EXP" value="EXP">
              Expense
            </option>
          </select>
        </div>{" "}
        <div className="flex items-end">
          <button
            type="submit"
            className="h-10 rounded-lg bg-blue-500 px-2 text-xs text-white shadow-md hover:cursor-pointer hover:bg-blue-800 hover:shadow-none"
          >
            Add transaction
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddLedger;
