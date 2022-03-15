import React from 'react';
import Movie from '../Movie/Movie';
import './MovieList.css';

export default function MovieList(props) {
  return (
    <div style={{ marginBottom: '8%' }}>
      <div className="movie-list">
        {props.allmovies.map((movie) => (
          <Movie key={movie._id} details={movie} />
        ))}
      </div>
      {/* <div className="movie-list">
        <Movie
          title={'Interstellar'}
          year={'2014'}
          rating={'5 stars'}
          description={
            'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.'
          }
          runtime={''}
          genre={''}
          type={'movie'}
          picture={'/images/interstellar.jpg'}
        />
        <Movie
          title={'A Quiet Place'}
          year={'2018'}
          rating={'4 stars'}
          description={
            'Christine Lady Bird McPherson, a teenage girl faces a lot of ups and downs in her relationships during her senior year in high school.'
          }
          type={'movie'}
          picture={'/images/a-quiet-place.jpg'}
        />
        <Movie
          title={'Lady Bird'}
          year={'2017'}
          rating={'4 stars'}
          type={'movie'}
          picture={'/images/lady-bird.jpg'}
        />
        <Movie
          title={'6 Underground'}
          year={'2019'}
          rating={'5 stars'}
          type={'movie'}
          picture={'/images/6-underground.jpg'}
        />
        <Movie
          title={'Inception'}
          year={'2010'}
          rating={'5 stars'}
          type={'movie'}
          picture={'/images/inception.jpg'}
        />
        <Movie
          title={'La La Land'}
          year={'2016'}
          rating={'5 stars'}
          type={'movie'}
          picture={'/images/la-la-land.jpg'}
        />
        <Movie
          title={'Iron Man'}
          year={'2008'}
          rating={'5 stars'}
          type={'movie'}
          picture={'/images/iron-man.jpg'}
        />
      </div> */}
    </div>
  );
}
