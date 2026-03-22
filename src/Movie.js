function Movie({ movie, onDelete }) {
  return (
    <div className="movie-card">
      <h3>{movie.title}</h3>

      <p>{movie.comment}</p>

      <p>{"⭐".repeat(movie.rating)}</p>

      <button
        className="delete-btn"
        onClick={() => onDelete(movie.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default Movie;