import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCastApi } from "../../api/TMDB-api";
import css from "./MovieCast.module.css";

const imgURL = "https://image.tmdb.org/t/p/";
const imgSize = "w300";

const DEFAULT_IMG =
  "https://www.interactive.org/images/games_developers/no_image_available_sm.jpg";

const MovieCast = () => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await getCastApi(movieId);
        setCast(response);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [movieId]);

  console.log(cast);

  return (
    <>
      {loading && <p>Loading.....</p>}
      {error && (
        <p>Oops, something went wrong! Please try reloading this page!</p>
      )}
      <div className={css.actorWrap}>
        <ul className={css.actorList}>
          {cast.map((el) => {
            return (
              <li key={el.id} className={css.actorItem}>
                <img
                  src={
                    el.profile_path
                      ? `${imgURL}${imgSize}${el.profile_path}`
                      : DEFAULT_IMG
                  }
                  alt={el.name}
                  width="300"
                  height="450"
                />
                <div className={css.actorInfo}>
                  <p>Actor: {el.original_name}</p>
                  <p>Role: {el.character}</p>
                  <p>Popularity: {el.popularity}%</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default MovieCast;
