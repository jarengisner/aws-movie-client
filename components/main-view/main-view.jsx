//importing modules from other files//
import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: 'Joker',
      Description:
        "The rise of Arthur Fleck, from aspiring stand-up comedian and pariah to Gotham's clown prince and leader of the revolution",
      Director: 'Todd Phillips',
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
      Genre: 'Drama',
    },
    {
      id: 2,
      Title: 'Interstellar',
      Description:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      Director: 'Chritopher Nolan',
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
      Genre: 'Sci-Fi',
    },
    {
      id: 3,
      Title: 'Shawshank Redemption',
      Description:
        'Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.',
      Director: 'Frank Darabont',
      imageUrl:
        'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg',
      Genre: 'Drama',
    },
  ]);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => {
          setSelectedMovie(null);
        }}
      />
    );
  }

  if (movies.length === 0) {
    return <div>'The movie list is empty'</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedBook) => {
            setSelectedMovie(newSelectedBook);
          }}
        />
      ))}
    </div>
  );
};
