import './movie-view.styles.scss';
import { Button, CloseButton, Modal, Card } from 'react-bootstrap';
import '../../index.scss';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

//movie and onBackClick are the props we are wanting access to//
export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);
  return (
    <Card>
      <Card.Img variant='top' src={movie.imageUrl} className='movieImg' />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>
          <div>
            <span className='sub-title'>Director: </span>
            <span>{movie.director}</span>
            <br></br>
            <span>{movie.directorBio}</span>
          </div>
          <div>
            <span className='sub-title'>Genre: </span>
            <span>{movie.genre}</span>
            <br></br>
            <span>{movie.genreDescription}</span>
          </div>
          <div>
            <span className='sub-title'>Description: </span>
            <span>{movie.description}</span>
          </div>
        </Card.Text>
        <Link to='/'>
          <Button variant='primary'>Back</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};
