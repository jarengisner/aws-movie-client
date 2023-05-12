import './movie-view.styles.scss';
import { Button } from 'react-bootstrap';
import '../../index.scss';

//movie and onBackClick are the props we are wanting access to//
export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.imageUrl}></img>
      </div>
      <div className='movieDetails'>
        <div>
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.director}</span>
          <br></br>
          <span>{movie.directorBio}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.genre}</span>
          <br></br>
          <span>{movie.genreDescription}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.description}</span>
        </div>
      </div>
      <Button variant='primary' onClick={onBackClick}>
        Back
      </Button>
    </div>
  );
};
