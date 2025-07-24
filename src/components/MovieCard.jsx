import { useMovieContext } from "../contexts/MovieContext";
import "../css/MovieCard.css";

const MovieCard = ({ movie }) => {
  // we can use the values in the context to create various features
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  const onFavoriteClick = (e) => {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div className="movie-overlay">
        {/* how we change the color of the icon if is favorite */}
        <button
          className={`favorite-btn ${favorite ? "active" : ""}`}
          onClick={onFavoriteClick}
        >
          ♥
        </button>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        {/* split at the hyphen and display the year only */}
        <h3>{movie.release_date?.split("-")[0]}</h3>
      </div>
    </div>
  );
};

export default MovieCard;
