import React, { useState } from 'react';
import './Movie.css';
import { useHistory } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

export default function Movie(props) {
  const history = useHistory();

  const routeChange = () => {
    //console.log('props idddddd ', props.details._id);
    let path = `/movie/` + props.details._id;
    history.push(path);
  };

  const [isShown, setIsShown] = useState(false);
  return (
    <div>
      <div
        style={{ marginLeft: '10px', marginRight: '10px', marginTop: '20px' }}
      >
        <div
          className="movie-display"
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          onClick={routeChange}
        >
          <img
            src={props.details.image}
            alt={props.details.title}
            className="img-display"
          />
          <p className="movie-title">
            {props.details.title} ({props.details.year})
          </p>

          <br />
          {isShown && (
            <div className="movie-overlay" onClick={routeChange}>
              <p className="movie-title">
                {props.details.title} ({props.details.year})
              </p>
              <div style={{ marginTop: '3px' }}>
                {' '}
                <StarRatings
                  rating={parseInt(props.details.rating)}
                  numberOfStars={5}
                  name="rating"
                  starSpacing="1px"
                  starDimension="20px"
                  starRatedColor="#fbff00"
                  style={{ marginTop: '0px' }}
                />
              </div>
              <p className="movie-description">{props.details.plot}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
