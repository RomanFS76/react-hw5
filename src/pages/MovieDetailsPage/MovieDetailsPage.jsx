import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { getDetailsApi } from "../../api/TMDB-api";
import css from "./MovieDetailsPage.module.css";

const imgURL = "https://image.tmdb.org/t/p/";
const imgSize = "w500";

const defaultImg = "https://www.interactive.org/images/games_developers/no_image_available_sm.jpg";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await getDetailsApi(movieId);

        setDetails(response);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [movieId]);
  return (
    <>
      <div className={css.details}>
        {loading && <p>Loading.....</p>}
        {error && (
          <p>Oops, something went wrong! Please try reloading this page!</p>
        )}
        <div className={css.detailsWrap}>
          <img
            src={details.poster_path ?`${imgURL}${imgSize}${details.poster_path}`: defaultImg} 
            alt={details.original_title}
            width="500"
            height="750"/>
          <div>
            <p className={css.movieTitle}>{details.original_title}</p>
            <p>Raiting: {details.vote_average*10}%</p>
            <p className={css.overview}>Overview</p>
            <p>{details.overview}</p>
            <p className={css.genreTitle}>Genres</p>
            <ul className={css.genreList}>
              {details?.genres?.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={css.additionalInformation}>
        <p>Additional information</p>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>{" "}
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default MovieDetailsPage;
