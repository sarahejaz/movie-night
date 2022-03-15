import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isEmptyArray } from 'formik';
import MovieList from '../MovieList/MovieList';
import MovieService from '../../services/movie.service';
import './AllShows.css';

export default function AllShows() {
  const [shows, setShows] = useState([]);
  const [search, setSearch] = useState('');
  const [searchShows, setSearchShows] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isEmptyArray(shows)) {
      axios
        .get(MovieService.getAllMovies())
        .then((res) => {
          var data = res.data;
          var new_data = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].filmType.toLowerCase() === 'show') {
              new_data.push(data[i]);
            }
          }
          setShows(new_data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [shows]);

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
      const results = shows.filter((show) => {
        return show.title.toLowerCase().includes(search.toLowerCase());
      });
      //movies = results;
      setSearchShows(results);
    } else {
      //console.log(searchShows);
      setSearchShows([]);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 className="all-shows-heading">All Shows</h1>
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

      {search.length === 0 ? (
        <MovieList allmovies={shows} />
      ) : submitted && searchShows ? (
        <MovieList allmovies={searchShows} />
      ) : submitted ? (
        <p>No shows found.</p>
      ) : (
        <MovieList allmovies={shows} />
      )}
    </div>
  );
}
