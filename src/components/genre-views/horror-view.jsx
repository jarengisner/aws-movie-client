import { Row, Col, Button, Card } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const HorrorView = ({ movies, user, syncUser, token }) => {
  const filtMovies = movies.filter((movie) => movie.genre === 'Horror');
  return (
    <>
      <Row className='genreRow'>
        <Col>
          <Card>
            <Card.Body>
              <div>
                <h1>Horror</h1>
              </div>
              <div>
                Horror is a genre of fiction that is intended to disturb,
                frighten or scare. Horror is often divided into the sub-genres
                of psychological horror and supernatural horror, which are in
                the realm of speculative fiction.
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className='justify-content-md-center'>
        {!filtMovies ? (
          <h3>No Horror Movies</h3>
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
