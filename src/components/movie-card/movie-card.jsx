import PropTypes, { string } from 'prop-types';
import { Button, Card } from 'react-bootstrap';
/* import './movie-card.styles.scss'; */
import '../../index.scss';

//movie and onMovieClick are our props we want access to in our child component//
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className='h-100'>
      <Card.Img variant='top' src={movie.imageUrl} className='movieImg' />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.author}</Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant='primary'>
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};
//proptypes used to verify information passed by props into our movie cards//
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    directorBio: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    genreDescription: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
