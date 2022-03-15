import axios from 'axios';

const API_URL = 'http://localhost:8080/api/savemovie/';

class SaveMovieService {
  /* ============================================================= ADD MOVIE ============================================================= */
  addMovie = (movieid, userid) => {
    return axios
      .post(API_URL + 'savemovie', {
        movieid,
        userid,
      })
      .catch((err) => console.error(err));

    // return axios
    //   .get(API_URL + 'allmovies')
    //   .then((response) => {
    //     console.log('all movies response data = ', response.data);
    //     return JSON.parse(response.data);
    //   })
    //   .catch((err) => console.error(err));
  };

  /* ============================================================= REMOVE MOVIE ============================================================= */
  removeMovie = (movieid, userid) => {
    //console.log('movieeeeeee id', movieid);
    return axios
      .post(API_URL + 'removemovie', {
        movieid,
        userid,
      })
      .catch((err) => console.error(err));

    // return axios
    //   .get(API_URL + 'allmovies')
    //   .then((response) => {
    //     console.log('all movies response data = ', response.data);
    //     return JSON.parse(response.data);
    //   })
    //   .catch((err) => console.error(err));
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
    return API_URL + 'allsavedmovies';
  };

  getCurrentMovie = () => {
    return JSON.parse(localStorage.getItem('movie'));
  };
}

export default new SaveMovieService();
