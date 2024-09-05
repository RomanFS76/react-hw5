import React from "react";
import css from "./SearchForm.module.css";
import { useSearchParams } from "react-router-dom";

const SearchForm = () => {
  const [params, setParams] = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchInput = form.elements.valueInput.value;
    if (searchInput === "") {
      alert("Field must be filled");
      return;
    }
    params.set("query", searchInput);
    setParams(params);
    form.reset;
  };
  return (
    <form onSubmit={handleSubmit} className={css.searchForm}>
      <input
        type="text"
        name="valueInput"
        placeholder="Search movie..."
        className={css.inpSearch}
      />
      <button type="submit" className={css.btnSearch}>
        Search
      </button>
    </form>
  );
};

export default SearchForm;
