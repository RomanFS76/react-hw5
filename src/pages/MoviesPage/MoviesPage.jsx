import React, { useEffect, useState } from "react";
import css from "./MoviesPage.module.css";
import { useSearchParams } from "react-router-dom";
import { getSearchApi } from "../../api/TMDB-api";

const MoviesPage = () => {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);



  useEffect(() => {
    const query = params.get("query");
    if(!query){
      return
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await getSearchApi(query);
        console.log(response)
        setSearch(response);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search]);



  const handleSubmit = (event) => {
    event.preventDefault();
    setParams({ query: event.target.elements.search.value });

    event.target.reset();
  };

  return (
    <>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <input
          type="text"
          className={css.inpSearch}
          placeholder="Search movie..."
          name="search"
        />
        <button type="submit" className={css.btnSearch}>
          Search
        </button>
      </form>
      {loading && <p>Loading.....</p>}
      {error && (
        <p>Oops, something went wrong! Please try reloading this page!</p>
      )}
    </>
  );
};

export default MoviesPage;
