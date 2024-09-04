import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewsApi } from "../../api/TMDB-api";
import css from "./MovieReviews.module.css";

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await getReviewsApi(movieId);
        setReviews(response);
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
      {loading && <p>Loading.....</p>}
      {error && (
        <p>Oops, something went wrong! Please try reloading this page!</p>
      )}
      {reviews.length > 0 ? (
        <ul className={css.reviewsList}>
          {reviews.map((el) => {
            return (
              <li key={el.id}>
                <p className={css.author}>{el.author}</p>
                <p className={css.content}>{el.content}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie</p>
      )}
    </>
  );
};

export default MovieReviews;
