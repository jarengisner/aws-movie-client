import { Col, Row, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import { FavoriteCard } from './favorite-card';
import '../../index.scss';

export const ProfileView = ({ movies, user, onLogout, token }) => {
  const favoriteMovies = movies.filter((m) => user.Favorites.includes(m.id));
  const deleteHandler = (e) => {
    e.preventDefault();
    fetch(`https://movie-findr.herokuapp.com/users/${user.Username}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      if (res.ok) {
        localStorage.clear();
        alert('Account Deleted');
        window.location.reload();
      } else {
        console.log('Something didn\t go right above');
      }
    });
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <div>
                  <h1>{user.Username}</h1>
                </div>
                <div>{user.Email}</div>
                <div>
                  <Link to={'/user/settings'}>
                    <Button variant='link'>Settings</Button>
                  </Link>
                </div>
                <div>
                  <Button onClick={onLogout} className='logout-button'>
                    Log Out
                  </Button>
                  <Button
                    onClick={deleteHandler}
                    variant='danger'
                    className='delete-button'
                  >
                    Delete Account
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className='justify-content-md-center'>
          <h2>Favorites:</h2>
          {!favoriteMovies ? (
            <h3>No favorites yet!</h3>
          ) : (
            favoriteMovies.map((movie) => {
              {
                console.log(movie);
              }
              return (
                <Col md={5} className='m-1'>
                  <FavoriteCard
                    key={movie.id}
                    movie={movie}
                    user={user}
                    token={token}
                  />
                </Col>
              );
            })
          )}
        </Row>
      </Container>
    </>
  );
};
