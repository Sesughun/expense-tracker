import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useContext } from "react";
import ExpenseContext from "./ExpenseContext";
function AddCategory() {
  const { category, setCategory, categoryEl, handleAddCategory } =
    useContext(ExpenseContext);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary floating-button2"
        data-bs-toggle="collapse"
        data-bs-target="#demo"
      >
        Add Category
      </button>
      <div id="demo" className="border-primary collapse">
        <div class="mt-4 p-5 bg-secondary text-white rounded mb-5">
          <div className="mb-3">
            <label for="amount" className="form-label">
              Category Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="setCategory"
              placeholder="Enter Category"
              ref={categoryEl}
            />
          </div>

          <button
            className="btn btn-large btn-primary"
            onClick={handleAddCategory}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
}
export default AddCategory;
