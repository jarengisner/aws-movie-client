//movie and onBackClick are the props we are wanting access to//
export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.imageUrl}></img>
      </div>
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
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
