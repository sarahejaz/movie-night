import React, { useState, useEffect } from 'react';
import './SavedMovies.css';
import SaveMovieService from '../../services/savemovie.service';
import AuthService from '../../services/auth.service';
import axios from 'axios';
import MovieList from '../MovieList/MovieList';
import { useHistory } from 'react-router-dom';

export default function SavedMovies(props) {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [searchMovies, setSearchMovies] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const history = useHistory();

  const goToHome = () => {
    let path = `/`;
    history.push(path);
  };

  useEffect(() => {
    if (AuthService.getCurrentUser()) {
      if (movies.length === 0) {
        const userid = AuthService.getCurrentUser().id;
        axios
          .post(SaveMovieService.getAllMovies(), { userid })
          .then((res) => {
            setMovies(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      goToHome();
    }
  }, [props, movies]);

  const handleChange = (event) => {
    setSubmitted(false);
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    filter(event);
  };

  const filter = (event) => {
    //setSearch(event.target.value);
    console.log('search ', search);

    if (search !== '') {
      const results = movies.filter((movie) => {
        //return movie.title.toLowerCase().startsWith(search.toLowerCase());
        return movie.title.toLowerCase().includes(search.toLowerCase());
      });
      //movies = results;
      setSearchMovies(results);
    } else {
      //console.log(searchMovies);
      setSearchMovies([]);
    }
  };

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1 className="saved-movies-heading">My Saved Movies</h1>
        {movies.length !== 0 ? (
          <div>
            <form onSubmit={handleSubmit} style={{ marginBottom: '4%' }}>
              <input
                type="text"
                label="search"
                placeholder="Search..."
                className="search-input"
                value={search}
                onChange={handleChange}
              />
              <button onClick={handleSubmit} className="search-button">
                Search
              </button>
            </form>

            {!submitted ? (
              <MovieList allmovies={movies} />
            ) : submitted && searchMovies.length !== 0 ? (
              <MovieList allmovies={searchMovies} />
            ) : (
              <p style={{ fontSize: '20px' }}>No movies found.</p>
            )}
          </div>
        ) : (
          <p style={{ fontSize: '20px' }}>No saved movies.</p>
        )}
        {/* {movies.length !== 0 ? (
          <MovieList allmovies={movies} />
        ) : (
          <p style={{ fontSize: '20px' }}>No saved movies.</p>
        )} */}
      </div>
    </div>
  );
}
