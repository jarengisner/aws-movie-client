//importing modules from other files//
import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignUpView } from '../signup-view/signup-view';
import { Row, Col } from 'react-bootstrap';
import '../../index.scss';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  //token is stored as a string, not JSON, so no need to parse here//
  const storedToken = localStorage.getItem('token');
  const [selectedMovie, setSelectedMovie] = useState(null);
  //movies is initialized to nothing, but then populated below//
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  //useEffect is used to run side effects during the course of a components lifecycle//
  useEffect(() => {
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

  return (
    <Row className='justify-content-md-center'>
      {!user || !token ? (
        //uses md breakpoint to make elements take 6 cols//
        <Col md={6}>
          Log In:
          <LoginView
            onLogin={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          or Sign up:
          <SignUpView />
        </Col>
      ) : selectedMovie ? (
        <Col md={8}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
      ) : movies.length === 0 ? (
        //can use this area for a loading spinner, etc//
        //refresh page to see how it would be positioned//
        <h1>Loading...</h1>
      ) : (
        <>
          {movies.map((movie) => (
            <Col md={3} className='mb-5'>
              <MovieCard
                key={movie.id}
                //deconstructs movie so that it is easily accessible as a prop//
                movie={movie}
                //passes our onMovieClick function as a prop to MovieCard//
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};
