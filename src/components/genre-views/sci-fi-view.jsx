import { Row, Col, Button, Card } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const SciFiView = ({ movies, user, syncUser, token }) => {
  const filtMovies = movies.filter((movie) => movie.genre === 'Sci-Fi');
  return (
    <>
      <Row className='genreRow'>
        <Col>
          <Card>
            <Card.Body>
              <div>
                <h1>Sci-Fi</h1>
              </div>
              <div>
                Science fiction (sometimes shortened to sf or sci-fi) is a genre
                of speculative fiction, which typically deals with imaginative
                and futuristic concepts such as advanced science and technology,
                space exploration, time travel, parallel universes, and
                extraterrestrial life.
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className='justify-content-md-center'>
        {!filtMovies ? (
          <h3>No Sci-Fi Movies</h3>
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
