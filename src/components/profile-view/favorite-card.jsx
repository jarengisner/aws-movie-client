import PropTypes, { string } from 'prop-types';
import { Button, Card } from 'react-bootstrap';
/* import './movie-card.styles.scss'; */
import '../../index.scss';
import { Link } from 'react-router-dom';

//This component will work the exact same as the movie-card, but it will instead be rendered with an un-favorite button//
export const FavoriteCard = ({ movie, user, token, syncUser }) => {
  const removeClick = (event) => {
    event.preventDefault();
    fetch(
      `http://ec2-18-234-71-99.compute-1.amazonaws.com:8080/${user.Username}/movies/${movie.id}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log('Something occurred in the first part');
        }
      })
      .then((data) => {
        console.log(data);
        console.log(JSON.stringify(data));
        syncUser(data);
        console.log('Removed successfully');
        alert('Removed from favorites');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Card className='h-100'>
      <Card.Img variant='top' src={movie.imageUrl} className='movieImg' />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.author}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant='link'>Details</Button>
        </Link>
        <Button onClick={removeClick}>Remove Favorite</Button>
      </Card.Body>
    </Card>
  );
};
//proptypes used to verify information passed by props into our movie cards//
FavoriteCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    directorBio: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    genreDescription: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};
