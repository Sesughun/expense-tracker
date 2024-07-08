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
  const [idCounter, setIdCounter] = useState(2);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const table_data = [
    {
      id: 0,
      date: {
        currentDate: now.toLocaleDateString(),
        currentTime: now.toLocaleTimeString(),
      },
      description: "Item 1",
      amount: 100,
      category: category[0],
    },
    {
      id: 1,
      date: {
        currentDate: now.toLocaleDateString(),
        currentTime: now.toLocaleTimeString(),
      },
      description: "Item 2",
      amount: 200,
      category: category[1],
    },
  ];
  const view_category = {
    Groceries: [table_data[0]],
    Vehicle: [table_data[1]],
  };

  const [table, setTable] = useState(table_data);
  //const [viewCategory, setViewCategory]=useState(view_category);

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
      id: idCounter,
      date: {
        currentDate: now.toLocaleDateString(),
        currentTime: now.toLocaleTimeString(),
      },
      description: descriptionEl.current.value,
      amount: amounts,
      category: categoryEl2.current.value,
    };
    setTable((prevTable) => [...prevTable, newTableSet]);
    setIdCounter((prevIdCounter) => prevIdCounter + 1);
    setTotal((prevAmount) => prevAmount + amounts);
    descriptionEl.current.value = "";
    amountEl.current.value = "";
    categoryEl2.current.value = "";
  }

  function handleDelete(id) {
    const itemToDelete = table.find((item) => item.id === id);
    if (itemToDelete) {
      setTotal((prevTotal) => prevTotal - itemToDelete.amount);
      setTable((prevTable) => prevTable.filter((item) => item.id !== id));
    }
  }
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  return (
    <div className="container">
      <h1>Milan's Expense Tracker</h1>
      <ExpenseContext.Provider
        value={{ category, setCategory, categoryEl, handleAddCategory }}
      >
        <div className="mb-3 mt-3">
          <label htmlFor="description" className="form-label">
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
          <label htmlFor="amount" className="form-label">
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
          <label htmlFor="category" className="form-label">
            Category:
          </label>
          <select className="form-select" ref={categoryEl2}>
            <option>Add category</option>
            {category.map((cates, index) => (
              <option key={index}>{cates}</option>
            ))}
          </select>
        </div>
        <div className="btn btn-primary m-15" onClick={handleSubmit}>
          Submit
        </div>
        <AddCategory />

        <div>
          <h2 style={{ margin: "1rem" }}>View Category</h2>

          <select
            className="form-select"
            placeholder="Add Category"
            onChange={handleCategoryChange}
          >
            <option>All</option>
            {category.map((cates, index) => (
              <option key={index}>{cates}</option>
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
              {selectedCategory != "All"
                ? view_category[selectedCategory].map((category2) => (
                    <tr key={category2.id}>
                      <td>
                        {category2.date.currentDate}
                        <br />
                        {category2.date.currentTime}
                      </td>
                      <td>{category2.description}</td>
                      <td>{category2.amount}</td>
                      <td>{category2.category}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onDoubleClick={() => handleDelete(category2.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                : table.map((item) => (
                    <tr key={item.id}>
                      <td>
                        {item.date.currentDate}
                        <br />
                        {item.date.currentTime}
                      </td>
                      <td>{item.description}</td>
                      <td>{item.amount}</td>
                      <td>{item.category}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onDoubleClick={() => handleDelete(item.id)}
                        >
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
