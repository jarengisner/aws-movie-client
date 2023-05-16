import { Col, Row, Card, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const ProfileView = ({ movies, user, onLogout }) => {
  const favoriteMovies = movies.filter((m) => user.Favorites.includes(m.id));
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
                <Link to={'/user/settings'}>
                  <Button variant='link'>Settings</Button>
                </Link>
                <Button onClick={onLogout}>Log Out</Button>
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
                  <MovieCard
                    key={movie.id}
                    //deconstructs movie so that it is easily accessible as a prop//
                    movie={movie}
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
