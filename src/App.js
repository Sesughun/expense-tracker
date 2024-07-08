import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddCategory from "./addCategory";
import ExpenseContext from "./ExpenseContext";

function App() {
  const now = new Date();
  const [category, setCategory] = useState(["Groceries", "Vehicle"]);
  const descriptionEl = useRef();
  const amountEl = useRef();
  const categoryEl = useRef();
  const categoryEl2 = useRef();
  const [total, setTotal] = useState(300);
  const table_data = [
    {
      date: {
        currentDate: now.toLocaleDateString(),
        currentTime: now.toLocaleTimeString(),
      },
      description: "Item 1",
      amount: 100,
      category: category[0],
    },
    {
      date: {
        currentDate: now.toLocaleDateString(),
        currentTime: now.toLocaleTimeString(),
      },
      description: "Item 2",
      amount: 200,
      category: category[1],
    },
  ];

  const [table, setTable] = useState(table_data);

  function handleAddCategory() {
    setCategory((prevCategories) => [
      ...prevCategories,
      categoryEl.current.value,
    ]);
    categoryEl.current.value = "";
  }
  useEffect(() => {}, [category]);

  function handleSubmit() {
    const amounts = parseFloat(amountEl.current.value);
    const newTableSet = {
      date: {
        currentDate: now.toLocaleDateString(),
        currentTime: now.toLocaleTimeString(),
      },
      description: descriptionEl.current.value,
      amount: amountEl.current.value,
      category: categoryEl2.current.value,
    };
    setTable((prevTable) => [...prevTable, newTableSet]);
    descriptionEl.current.value = "";
    amountEl.current.value = "";
    categoryEl2.current.value = "";
    setTotal((prevAmount) => prevAmount + amounts);
  }
  function handleDelete() {}

  return (
    <div className="container">
      <h1>Milan's Expense Tracker</h1>
      <ExpenseContext.Provider
        value={{ category, setCategory, categoryEl, handleAddCategory }}
      >
        <div className="mb-3 mt-3">
          <label for="description" className="form-label">
            Description:
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Enter item description"
            name="Description"
            ref={descriptionEl}
          />
        </div>
        <div className="mb-3">
          <label for="amount" className="form-label">
            Amount (NGN):
          </label>
          <input
            type="number"
            className="form-control"
            id="amount"
            placeholder="Enter price"
            name="Amount"
            min={100}
            step={100}
            ref={amountEl}
          />
        </div>
        <div className="mb-3">
          <label for="category" className="form-label">
            Category:
          </label>
          <select class="form-select" ref={categoryEl2}>
            <option>Add category</option>
            {category.map((cates) => (
              <option>{cates}</option>
            ))}
          </select>
        </div>
        <div className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </div>
        <AddCategory />

        <div>
          <h2 style={{ margin: "1rem" }}>View Category</h2>

          <select class="form-select" placeholder="Add Category">
            <option>All</option>
            {category.map((cates) => (
              <option>{cates}</option>
            ))}
          </select>
          <table className="table table-bordered w-100" id="table-text">
            <thead>
              <tr>
                <th>Date/Time</th>
                <th>Description</th>
                <th>Amount(NGN)</th>
                <th>Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {table.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.date.currentDate}
                    <br />
                    {item.date.currentTime}
                  </td>
                  <td>{item.description}</td>
                  <td>{item.amount}</td>
                  <td>{item.category}</td>
                  <td>
                    <button className="btn btn-danger" onClick={handleDelete}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td>
                  <b>Total:</b>
                </td>
                <td>
                  <b>{total}</b>
                </td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </ExpenseContext.Provider>
    </div>
  );
}

export default App;
