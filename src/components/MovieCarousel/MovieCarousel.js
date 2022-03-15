import React, { useState, useEffect } from 'react';
import Movie from '../Movie/Movie';
import './MovieCarousel.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';
import { isEmptyArray } from 'formik';
import MovieService from '../../services/movie.service';

export default function MovieCarousel(props) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [movies, setMovies] = useState([]);

  useEffect(() => {
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

  const detailsArray = {
    interstellar: {
      title: 'Interstellar',
      year: '2014',
      rating: '5 stars',
      plot: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.',

      runtime: '',
      genre: '',
      type: 'movie',
      image: '/images/interstellar.jpg',
    },
    aquietplace: {
      title: 'A Quiet Place',
      year: '2018',
      rating: '4 stars',
      plot: 'A family must live in silence to avoid mysterious creatures that hunt by sound. Knowing that even the slightest whisper or footstep can bring death, Evelyn and Lee are determined to find a way to protect their children while desperately searching for a way to fight back.',

      runtime: '',
      genre: '',
      type: 'movie',
      image: '/images/a-quiet-place.jpg',
    },
    ironman: {
      title: 'Iron Man',
      year: '2008',
      rating: '5 stars',
      plot: 'When Tony Stark, an industrialist, is captured, he constructs a high-tech armoured suit to escape. Once he manages to escape, he decides to use his suit to fight against evil forces to save the world.',
      runtime: '',
      genre: '',
      type: 'movie',
      image: '/images/iron-man.jpg',
    },
    sixunderground: {
      title: '6 Underground',
      year: '2019',
      rating: '5 stars',
      plot: 'Six individuals from all around the globe, each the very best at what they do, have been chosen not only for their skill, but for a unique desire to delete their pasts to change the future.',
      runtime: '',
      genre: '',
      type: 'movie',
      image: '/images/6-underground.jpg',
    },
    lalaland: {
      title: 'La La Land',
      year: '2016',
      rating: '5 stars',
      plot: 'Sebastian (Ryan Gosling) and Mia (Emma Stone) are drawn together by their common desire to do what they love. But as success mounts they are faced with decisions that begin to fray the fragile fabric of their love affair, and the dreams they worked so hard to maintain in each other threaten to rip them apart.',
      runtime: '',
      genre: '',
      type: 'movie',
      image: '/images/la-la-land.jpg',
    },
  };

  return (
    <div
      style={{
        width: 'inherit',
        margin: '0 auto',
        paddingLeft: '7%',
        paddingRight: '7%',
      }}
    >
      <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        keyBoardControl={true}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="movie-carousel-list"
      >
        {/* <div style={{ width: 'inherit', display: 'flex' }}>
          {' '}
          {movies.map((movie) => (
            <div>
              <div key={movie._id} className="movie-carousel-list">
                <Movie details={movie} />
              </div>
            </div>
          ))}
        </div> */}

        <div>
          {' '}
          <div className="movie-list">
            <Movie details={detailsArray['interstellar']} />
          </div>
        </div>
        <div>
          {' '}
          <div className="movie-list">
            <Movie details={detailsArray['aquietplace']} />
          </div>
        </div>
        <div>
          {' '}
          <div className="movie-list">
            <Movie details={detailsArray['ironman']} />
          </div>
        </div>
        <div>
          {' '}
          <div className="movie-list">
            <Movie details={detailsArray['sixunderground']} />
          </div>
        </div>
        <div>
          {' '}
          <div className="movie-list">
            <Movie details={detailsArray['lalaland']} />
          </div>
        </div>
      </Carousel>
    </div>
  );
}
