import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const ProfileView = ({ movies, user, onLogout }) => {
  const favoriteMovies = movies.filter((m) => user.Favorites.includes(m.id));
  return (
    <div>
      <div>
        <h1>{user.Username}</h1>
        <Link to={'/user/settings'}>
          <Button variant='link'>Settings</Button>
        </Link>
      </div>
      <div>{user.Email}</div>
      <div>{user.Birthday}</div>
      <div>
        <h2>Favorites:</h2>
        {!favoriteMovies ? (
          <h3>No favorites yet!</h3>
        ) : (
          favoriteMovies.map((movie) => {
            {
              console.log(movie);
            }
            return (
              <MovieCard
                key={movie.id}
                //deconstructs movie so that it is easily accessible as a prop//
                movie={movie}
              />
            );
          })
        )}
      </div>
      <Button onClick={onLogout}>Log Out</Button>
    </div>
  );
};
