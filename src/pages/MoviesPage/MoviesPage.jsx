import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSearchApi } from "../../api/TMDB-api";

const MoviesPage = () => {
  const [search, setSearch] = useState();
  const [params, setParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const query = params.get("query");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = getSearchApi(query);

        setSearch(response);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params]);

  console.log(search);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    setParams({ query: form.elements.valueInput.value });

    form.reset;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="valueInput" placeholder="Search movie..." />
        <button type="submit">Search</button>
      </form>
      {/* {search.length > 0 && <p>Hello</p>} */}
    </>
  );
};

export default MoviesPage;
