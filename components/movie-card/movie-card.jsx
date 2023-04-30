export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.Title}
    </div>
  );
};

/*export const BookCard = ({ book, onBookClick }) => {
  return (
    <div
      onClick={() => {
        onBookClick(book);
      }}
    >
      {book.Title}
    </div>
  );
};*/
