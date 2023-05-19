import { Row, Col, Button, Card } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const ComedyView = ({ movies, user, syncUser, token }) => {
  const filtMovies = movies.filter((movie) => movie.genre === 'Comedy');
  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <div>
                <h1>Comedy</h1>
              </div>
              <div>
                Comedy is a genre of fiction that consists of discourses or
                works intended to be humorous or amusing by inducing laughter,
                especially in theatre, film, stand-up comedy, television, radio,
                books, or any other entertainment medium.
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className='justify-content-md-center'>
        {!filtMovies ? (
          <h3>No Comedy Movies</h3>
        ) : (
          filtMovies.map((movie) => {
            {
              console.log(movie);
            }
            return (
              <Col md={3} className='m-1' key={movie.id}>
                <MovieCard
                  movie={movie}
                  key={movie.id}
                  syncUser={syncUser}
                  user={user}
                  token={token}
                />
              </Col>
            );
          })
        )}
      </Row>
    </>
  );
};
