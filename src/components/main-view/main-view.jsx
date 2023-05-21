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
import { ActionView } from '../genre-views/action-view';
import { ComedyView } from '../genre-views/comedy-view';
import { SciFiView } from '../genre-views/sci-fi-view';
import { DramaView } from '../genre-views/drama-view';
import { HorrorView } from '../genre-views/horror-view';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  //token is stored as a string, not JSON, so no need to parse here//
  const storedToken = localStorage.getItem('token');
  //movies is initialized to nothing, but then populated below//
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');

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
  //syncUser is used to sync the local storage up with our updated user in the database, when movies are favorited/unfavorited//
  const syncUser = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} setQuery={setQuery} setFilter={setFilter} />
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
                    <SignUpView
                      onSignUp={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
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
                      token={token}
                      syncUser={syncUser}
                      onLogout={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
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
            path='/genres/Action'
            element={
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : (
                  <ActionView
                    movies={movies}
                    user={user}
                    token={token}
                    syncUser={syncUser}
                  />
                )}
              </>
            }
          />
          <Route
            path='/genres/Comedy'
            element={
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : (
                  <ComedyView
                    movies={movies}
                    user={user}
                    token={token}
                    syncUser={syncUser}
                  />
                )}
              </>
            }
          />
          <Route
            path='/genres/Sci-Fi'
            element={
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : (
                  <SciFiView
                    movies={movies}
                    user={user}
                    token={token}
                    syncUser={syncUser}
                  />
                )}
              </>
            }
          />
          <Route
            path='/genres/Drama'
            element={
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : (
                  <DramaView
                    movies={movies}
                    user={user}
                    token={token}
                    syncUser={syncUser}
                  />
                )}
              </>
            }
          />
          <Route
            path='/genres/Horror'
            element={
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : (
                  <HorrorView
                    movies={movies}
                    user={user}
                    token={token}
                    syncUser={syncUser}
                  />
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
                    {query
                      ? movies
                          .filter((movie) =>
                            movie.title.toLowerCase().includes(query)
                          )
                          .map((movie) => (
                            <Col md={3} className='mb-5' key={movie.id}>
                              <MovieCard
                                movie={movie}
                                key={movie.id}
                                user={user}
                                token={token}
                                syncUser={syncUser}
                              />
                            </Col>
                          ))
                      : movies.map((movie) => (
                          <Col md={3} className='mb-5' key={movie.id}>
                            <MovieCard
                              movie={movie}
                              key={movie.id}
                              user={user}
                              token={token}
                              syncUser={syncUser}
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
