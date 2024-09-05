import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {

  const location = useLocation();
  

  return (
    <div>
      <ul className={css.movieList}>
        {movies.map(({ id, original_title }) => {
          return (
            <li key={id}>
              <Link to={`/movies/${id}`} state={location}>{original_title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MovieList;
