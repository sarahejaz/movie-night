import React, { useEffect, useState } from 'react';
import MovieCarousel from '../MovieCarousel/MovieCarousel';
import MovieList from '../MovieList/MovieList';
import './Homepage.css';
import AuthService from '../../services/auth.service';
import axios from 'axios';
import { isEmptyArray } from 'formik';
import MovieService from '../../services/movie.service';

export default function Homepage(props) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (typeof props.updateUsername === 'function') {
      if (AuthService.getCurrentUser() != null) {
        props.updateUsername(AuthService.getCurrentUser().username);
      } else if (AuthService.getCurrentAdmin() != null) {
        props.updateUsername(AuthService.getCurrentAdmin().username);
      } else {
        props.updateUsername('');
      }
    }

    if (isEmptyArray(movies)) {
      axios
        .get(MovieService.getAllMovies())
        .then((res) => {
          setMovies(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props, movies]);

  return (
    <div>
      <br />
      <div className="main-heading">
        <h2 className="name-heading">Movie Night</h2>
        <h4 className="main-subheading">It's movie night every night!</h4>
      </div>
      <br />
      <br />
      <br />
      <div>
        <h3 className="movie-carousel-heading">
          <b>New</b> Releases
        </h3>
        <MovieCarousel />
      </div>
      <div>
        <h3 className="movie-carousel-heading">
          <b>Top</b> Rated
        </h3>
        <MovieCarousel />
      </div>
      <div>
        <h3 className="movie-carousel-heading">
          Our <b>Picks</b>
        </h3>
        <MovieCarousel />
      </div>
      <div>
        <h3 className="movie-carousel-heading">All</h3>
        <MovieList allmovies={movies} />
      </div>
    </div>
  );
}
