import { Row, Col, Button, Card } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const ActionView = ({ movies, user, syncUser, token }) => {
  const filtMovies = movies.filter((movie) => movie.genre === 'Action');
  return (
    <>
      <Row className='genreRow'>
        <Col>
          <Card>
            <Card.Body>
              <div>
                <h1>Action</h1>
              </div>
              <div>
                Action film is a film genre in which the protagonist is thrust
                into a series of events that typically involve violence and
                physical feats. The genre tends to feature a mostly resourceful
                hero struggling against incredible odds, which include
                life-threatening situations, a dangerous villain, or a pursuit
                which usually concludes in victory for the hero.
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className='justify-content-md-center'>
        {!filtMovies ? (
          <h3>No Action Movies</h3>
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
