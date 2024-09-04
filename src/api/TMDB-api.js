import axios from "axios";

axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTYyMDlhZDAwYzg4ZTcwYzRmY2Q2Y2VhMjM0MTg1NCIsIm5iZiI6MTcyNTMwMjY4OS45MjM3MzksInN1YiI6IjY2NmVjZDRlZWE4MGFjNWViNTZiYmU0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0CudJMz0-2wg91kILxnCmYCrPxFzwoeiKWvGSxKQbU8";
axios.defaults.baseURL = "https://api.themoviedb.org/3";

const instance = axios.create();

const getMovieApi = async () => {
  const { data } = await instance.get("/trending/movie/day");

  return data.results;
};

const getDetailsApi = async (movieId) => {
  const { data } = await instance.get(`/movie/${movieId}`);
  return data;
};

// https:api.themoviedb.org/3/movie/{movie_id}/credits

const getCastApi = async (movieId) => {
  const { data } = await instance.get(`/movie/${movieId}/credits`);

  return data.cast;
};

const getReviewsApi = async (movieId) => {
  const { data } = await instance.get(`/movie/${movieId}/reviews`);

  return data.results;
};

const getSearchApi = async (query) => {
  const {data} = await instance.get(`/search/movie?query=${query}`);

  return data.results;
};

export { getMovieApi, getDetailsApi, getCastApi, getReviewsApi, getSearchApi };
