import React, { useEffect, useState } from "react";
import { getMovieApi } from "../../api/TMDB-api";
import css from "./HomePage.module.css";

import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await getMovieApi();
        setMovies(response);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 


  return (
    <>
      <h1 className={css.headTitle}>Trending today</h1>
      {loading && <p>Loading.....</p>}
      {error && (
        <p>Oops, something went wrong! Please try reloading this page!</p>
      )}
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
};

export default HomePage;
