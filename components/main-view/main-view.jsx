//importing modules from other files//
import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';

export const MainView = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  //movies is initialized to nothing, but then populated below//
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  //useEffect is used to run side effects during the course of a components lifecycle//
  useEffect(() => {
    if (!token) {
      console.log('whyyyyy isnt there a token here');
      return;
    }

    fetch('https://movie-findr.herokuapp.com/movies', {
      headers: { Authorization: 'Bearer ${token' },
    })
      .then((res) => res.json())
      .then((data) => {
        const dataMovies = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            director: movie.Director.Name,
            directorBio: movie.Director.Bio,
            genre: movie.Genre.Name,
            genreDescription: movie.Genre.Description,
            description: movie.Description,
            imageUrl: movie.ImageUrl,
          };
        });
        //console log for debugging//
        console.log(dataMovies);
        //populates our state using the function we declared when initializing the state above//
        setMovies(dataMovies);
      });
  }, [token]);

  if (!user) {
    return (
      <LoginView
        onLogin={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
    );
  }

  //if we click on a movie//
  if (selectedMovie) {
    return (
      <MovieView
        //passes our selected movie as a prop to MovieView//
        movie={selectedMovie}
        //passes our onBackClick function as a prop to MovieView//
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
          //deconstructs movie so that it is easily accessible as a prop//
          movie={movie}
          //passes our onMovieClick function as a prop to MovieCard//
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
