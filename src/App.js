import { useState } from "react";
import Movie from "./Movie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);

  const addMovie = () => {
    if (title.trim() === "") return;

    const newMovie = {
      id: Date.now(),
      title,
      comment,
      rating,
    };

    setMovies([...movies, newMovie]);

    setTitle("");
    setComment("");
    setRating(1);
  };

  const deleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  return (
    <div className="container">
      <h1>🎬 Movie Watchlist</h1>

      <div className="form">
        <input
          placeholder="Movie name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />

        <button onClick={addMovie}>Add Movie</button>
      </div>

      {movies.map((movie) => (
        <Movie key={movie.id} movie={movie} onDelete={deleteMovie} />
      ))}
    </div>
  );
}

export default App;