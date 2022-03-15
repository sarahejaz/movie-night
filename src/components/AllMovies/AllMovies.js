import React, { useState, useEffect } from 'react';
import MovieService from '../../services/movie.service';
import axios from 'axios';
import { isEmptyArray } from 'formik';
import MovieList from '../MovieList/MovieList';
import './AllMovies.css';

export default function AllMovies() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [searchMovies, setSearchMovies] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // const result = MovieService.getAllMovies();
    // console.log('result!! ', MovieService.getAllMovies());
    // if (movies.length !== 0) {
    //   setMovies(result);
    // }

    const detailsArray = {
      aquietplace: {
        _id: '1',
        title: 'A Quiet Place',
        year: '2018',
        rating: '4 stars',
        plot: 'A family must live in silence to avoid mysterious creatures that hunt by sound. Knowing that even the slightest whisper or footstep can bring death, Evelyn and Lee are determined to find a way to protect their children while desperately searching for a way to fight back.',

        runtime: '',
        genre: '',
        filmType: 'movie',
        image: '/images/a-quiet-place.jpg',
      },
      ironman: {
        _id: '2',
        title: 'Iron Man',
        year: '2008',
        rating: '5 stars',
        plot: 'When Tony Stark, an industrialist, is captured, he constructs a high-tech armoured suit to escape. Once he manages to escape, he decides to use his suit to fight against evil forces to save the world.',
        runtime: '',
        genre: '',
        filmType: 'movie',
        image: '/images/iron-man.jpg',
      },
      sixunderground: {
        _id: '3',
        title: '6 Underground',
        year: '2019',
        rating: '5 stars',
        plot: 'Six individuals from all around the globe, each the very best at what they do, have been chosen not only for their skill, but for a unique desire to delete their pasts to change the future.',
        runtime: '',
        genre: '',
        filmType: 'movie',
        image: '/images/6-underground.jpg',
      },
      lalaland: {
        _id: '4',
        title: 'La La Land',
        year: '2016',
        rating: '5 stars',
        plot: 'Sebastian (Ryan Gosling) and Mia (Emma Stone) are drawn together by their common desire to do what they love. But as success mounts they are faced with decisions that begin to fray the fragile fabric of their love affair, and the dreams they worked so hard to maintain in each other threaten to rip them apart.',
        runtime: '',
        genre: '',
        filmType: 'movie',
        image: '/images/la-la-land.jpg',
      },
    };

    if (isEmptyArray(movies)) {
      axios
        .get(MovieService.getAllMovies())
        .then((res) => {
          var data = res.data;
          var new_data = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].filmType.toLowerCase() === 'movie') {
              new_data.push(data[i]);
            }
          }
          setMovies(new_data);
          // const _movies = movies;

          // for (let key in detailsArray) {
          //   _movies.push(detailsArray[key]);
          // }
          // setMovies(_movies);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [movies]);

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
    <div style={{ textAlign: 'center' }}>
      <h1 className="all-movies-heading">All Movies</h1>
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

      {/* {search.length === 0 ? (
        <MovieList allmovies={movies} />
      ) : submitted && searchMovies ? (
        <MovieList allmovies={searchMovies} />
      ) : submitted ? (
        <p>No movies found.</p>
      ) : (
        <MovieList allmovies={movies} />
      )} */}

      {!submitted ? (
        <MovieList allmovies={movies} />
      ) : submitted && searchMovies.length !== 0 ? (
        <MovieList allmovies={searchMovies} />
      ) : (
        <p style={{ fontSize: '20px' }}>No movies found.</p>
      )}
    </div>
  );
}
