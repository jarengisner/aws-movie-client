//importing modules from other files//
import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignUpView } from '../signup-view/signup-view';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = JSON.parse(localStorage.getItem('token'));
  const [selectedMovie, setSelectedMovie] = useState(null);
  //movies is initialized to nothing, but then populated below//
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  //useEffect is used to run side effects during the course of a components lifecycle//
  useEffect(() => {
    if (!token) {
      console.log("can't figure out why there isn\t a token here");
      return;
    }

    fetch('https://movie-findr.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
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
      <div>
        <LoginView
          onLogin={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignUpView />
      </div>
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
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Log Out
      </button>
    </div>
  );
};
