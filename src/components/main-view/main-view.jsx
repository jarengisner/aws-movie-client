//importing modules from other files//
import { useEffect, useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignUpView } from '../signup-view/signup-view';
import { NavigationBar } from '../navbar-component/navbar-component';
import { ProfileView } from '../profile-view/profile-view';
import { UserSettings } from '../user-settings-view/user-settings';
import { Row, Col, Button } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import '../../index.scss';
import { UserSettings } from '../user-settings-view/user-settings';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  //token is stored as a string, not JSON, so no need to parse here//
  const storedToken = localStorage.getItem('token');
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
    <BrowserRouter>
      <NavigationBar user={user} />
      <Row className='justify-content-md-center'>
        <Routes>
          <Route
            path='/signup'
            element={
              <>
                {user ? (
                  <Navigate to='/' />
                ) : (
                  <Col md={5}>
                    <SignUpView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path='/login'
            element={
              <>
                {user ? (
                  <Navigate to='/' />
                ) : (
                  <Col md={5}>
                    <LoginView onLogin={(user) => setUser(user)} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path='/movies/:movieId'
            element={
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : movies.length === 0 ? (
                  <Col md={5}>
                    <h1>Loading...</h1>
                  </Col>
                ) : (
                  <Col md={5}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path='/user/profile'
            element={
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : (
                  <Col md={5}>
                    <ProfileView
                      movies={movies}
                      user={user}
                      onLogout={() => {
                        setUser(null);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path='/user/settings'
            element={
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : (
                  <Col md={5}>
                    <UserSettings user={user} token={token} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path='/'
            element={
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : movies.length === 0 ? (
                  <Col md={5}>
                    <h1>Loading...</h1>
                  </Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col md={3} className='mb-5' key={movie.id}>
                        <MovieCard
                          key={movie.id}
                          //deconstructs movie so that it is easily accessible as a prop//
                          movie={movie}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
