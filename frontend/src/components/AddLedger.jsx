import React, { useState } from "react";

function AddLedger({ addLedger, categories }) {
  const [formData, setFormData] = useState({
    category_id: "cb9b35e0-7de3-45eb-8368-7dddf3b265f6",
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
    try {
      await addLedger(formData);
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        toast.error("No server response");
      } else {
        toast.error("Action failed");
      }
    }
  };

  return (
    <div className="flex">
      <form onSubmit={onSubmit} className="flex">
        <div className="flex flex-col">
          <label>category</label>
          <select value={category_id} name="category_id" onChange={onChange}>
            {categories.map((category) => (
              <option key={category.name} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label>name</label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder=" enter transaction name"
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col">
          <label>amount</label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            type="number"
            id="amount"
            name="amount"
            value={amount}
            placeholder="enter transaction's amount"
            onChange={onChange}
          />{" "}
        </div>
        <div className="flex flex-col">
          <label>note</label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            type="text"
            id="note"
            name="note"
            value={note}
            placeholder=" write a note"
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col">
          <label>type</label>
          <select value={trans_type} name="trans_type" onChange={onChange}>
            <option key="INC" value="INC">
              Income
            </option>
            <option key="EXP" value="EXP">
              Expense
            </option>
          </select>
        </div>{" "}
        <div className="p-4">
          <button
            type="submit"
            className="rounded-lg bg-blue-500 p-2 text-white shadow-md hover:cursor-pointer hover:bg-blue-800 hover:shadow-none"
          >
            Add transaction
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddLedger;
