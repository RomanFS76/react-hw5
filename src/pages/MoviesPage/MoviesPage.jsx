import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSearchApi } from "../../api/TMDB-api";
import MovieList from "../../components/MovieList/MovieList";
import SearchForm from "../../components/searchForm/searchForm";



const MoviesPage = () => {
  const [search, setSearch] = useState([]);
  const [params, setParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const query = params.get("query");


  useEffect(() => {
  
    if (!query) {
      return;
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await getSearchApi(query);
        setSearch(response);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params]);
  return (
    <>
      <SearchForm/>
      {loading && <p>Loading.....</p>}
      {error && (
        <p>Oops, something went wrong! Please try reloading this page!</p>
      )}
      {search.length > 0 && <MovieList movies={search}/>}
    </>
  );
};

export default MoviesPage;
