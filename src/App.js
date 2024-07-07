import "./App.css";
import React, { useState, useRef, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddCategory from "./addCategory";
import ExpenseContext from "./ExpenseContext";

function App() {
  const [category, setCategory] = useState(["Groceries", "Vehicle"]);
  const table_data = [
    {
      description: "Item 1",
      amount: 100,
      category: category[0],
    },
    {
      description: "Item 2",
      amount: 200,
      category: category[1],
    },
  ];
  const categoryEl = useRef();
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
    //setTable()
  }
  function handleDelete() {}

  return (
    <div className="container">
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
          />
        </div>
        <div className="mb-3">
          <label for="category" className="form-label">
            Category:
          </label>
          <select class="form-select">
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
          View Category
          <select class="form-select">
            <option>Add category</option>
            {category.map((cates) => (
              <option>{cates}</option>
            ))}
          </select>
          <table className="table table-bordered w-100" id="table-text">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Category</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {table.map((item, index) => (
                <tr key={index}>
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
            </tbody>
          </table>
        </div>
      </ExpenseContext.Provider>
    </div>
  );
}

export default App;
