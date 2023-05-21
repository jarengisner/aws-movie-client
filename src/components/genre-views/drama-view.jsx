import { Row, Col, Button, Card } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const DramaView = ({ movies, user, syncUser, token }) => {
  const filtMovies = movies.filter((movie) => movie.genre === 'Drama');
  return (
    <>
      <Row className='genreRow'>
        <Col>
          <Card>
            <Card.Body>
              <div>
                <h1>Drama</h1>
              </div>
              <div>
                In film and television, drama is a category or genre of
                narrative fiction (or semi-fiction) intended to be more serious
                than humorous in tone.
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className='justify-content-md-center'>
        {!filtMovies ? (
          <h3>No Drama Movies</h3>
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
