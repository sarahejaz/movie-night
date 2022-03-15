import React from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/movie/';

class MovieService {
  /* ============================================================= FIND MOVIE ============================================================= */
  findMovie = (id) => {
    // return axios
    //   .get(API_URL + 'findmovie', {
    //     name,
    //   })
    //   .then((response) => {
    //     if (response.data.accessToken) {
    //       localStorage.setItem('movie', JSON.stringify(response.data));
    //     }

    //     return response.data;
    //   });
    return API_URL + 'findmovie/' + id;
  };

  /* ============================================================= ADD MOVIE ============================================================= */
  addMovie = (
    title,
    year,
    rating,
    plot,
    runtime,
    genre,
    director,
    creator,
    cast,
    filmType,
    image
  ) => {
    console.log('cast  ', cast);
    return axios.post(API_URL + 'addmovie', {
      title,
      year,
      rating,
      plot,
      runtime,
      genre,
      director,
      creator,
      cast,
      filmType,
      image,
    });
  };

  /* ================================================= GET ALL MOVIES (RETURNS GET ALL MOVIES URL) ================================================= */
  getAllMovies = () => {
    // return axios
    //   .get(API_URL + 'allmovies')
    //   .then((response) => {
    //     console.log('all movies response data = ', response.data);
    //     return JSON.parse(response.data);
    //   })
    //   .catch((err) => console.error(err));
    return API_URL + 'allmovies';
  };

  getCurrentMovie = () => {
    return JSON.parse(localStorage.getItem('movie'));
  };
}

export default new MovieService();
