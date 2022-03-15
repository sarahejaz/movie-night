import React, { useState, useEffect } from 'react';
import './MovieDetails.css';
import StarRatings from 'react-star-ratings';
import MovieService from '../../services/movie.service';
import axios from 'axios';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { Modal } from 'react-bootstrap';
import AuthService from '../../services/auth.service';
import SaveMovieService from '../../services/savemovie.service';

if (AuthService.getCurrentUser()) {
  const userid = AuthService.getCurrentUser().id;
  axios
    .post(SaveMovieService.getAllMovies(), { userid })
    .then((res) => {
      //setSavedMovies(res.data);
      localStorage.setItem('savedmovies', JSON.stringify(res.data));
    })
    .catch((error) => {
      console.log(error);
    });
}

export default function MovieDetails(props) {
  const [rating, setRating] = useState(0);
  const [rateOnce, setRateOnce] = useState(false);
  const [movie, setMovie] = useState({});
  const [saved, setSaved] = useState(false);

  const isSignedIn = AuthService.getCurrentUser();

  const changeRating = (newRating) => {
    if (rateOnce === false) {
      setRating(newRating);
      setRateOnce(true);
    }
  };

  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    //console.log('movie id ', props.match.params);
    if (isEmpty(movie)) {
      axios
        .get(MovieService.findMovie(props.match.params.id))
        .then((res) => {
          setMovie(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    var temp = JSON.parse(localStorage.getItem('savedmovies'));
    //console.log('temp from useEffect ', temp);

    temp.findIndex((x) => x._id === movie._id) === -1
      ? setSaved(false)
      : setSaved(true);
  }, [props, movie]);

  const addToSaved = () => {
    var temp = JSON.parse(localStorage.getItem('savedmovies'));
    var objAlreadyExists = false;
    //temp.filter((f) => f.some((t) => t.id === movie._id)).concat([movie]);
    //temp.push(movie);

    //if movie._id is not found, then push. Else object already exists.
    temp.findIndex((x) => x._id === movie._id) === -1
      ? temp.push(movie)
      : (objAlreadyExists = true);
    //console.log('temp  ', temp);
    if (!objAlreadyExists) {
      SaveMovieService.addMovie(movie._id, isSignedIn.id);
      localStorage.setItem('savedmovies', JSON.stringify(temp));
    }
    setSaved(true);
  };

  const removeFromSaved = () => {
    var temp = JSON.parse(localStorage.getItem('savedmovies'));
    var filtered = temp.filter(function (m, index, arr) {
      return m._id !== movie._id;
    });
    //console.log('filtered ', filtered);

    SaveMovieService.removeMovie(movie._id, isSignedIn.id);
    localStorage.setItem('savedmovies', JSON.stringify(filtered));
    setSaved(false);
  };

  return (
    <div>
      <br />
      <br />
      <div className="white-div">
        {/* =================================================== DISPLAY MOVIE NAME AND YEAR =================================================== */}
        <h1 style={{ display: 'inline' }}>
          {movie.title} ({movie.year})
        </h1>

        {isSignedIn ? (
          <table style={{ display: 'inline', float: 'right' }}>
            <tbody>
              <tr style={{ height: '10px' }}>
                <td valign="center">
                  {/* =================================================== DISPLAY ADD TO SAVED =================================================== */}
                  {saved ? (
                    <FaBookmark
                      style={{
                        display: 'inline',
                        height: '34px',
                        width: '34px',
                        margin: 0,
                        cursor: 'pointer',
                      }}
                      onClick={removeFromSaved}
                    />
                  ) : (
                    <FaRegBookmark
                      style={{
                        display: 'inline',
                        height: '34px',
                        width: '34px',
                        margin: 0,
                        cursor: 'pointer',
                      }}
                      onClick={addToSaved}
                    />
                  )}
                </td>
                <td valign="center">
                  {' '}
                  <h4 style={{ display: 'inline', marginLeft: '12px' }}>
                    Add to Saved
                  </h4>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p></p>
        )}

        <table style={{ width: '99%' }}>
          <tbody>
            <tr>
              <td className="left-side" valign="top">
                {' '}
                {/* =================================================== IMAGE DISPLAY =================================================== */}
                <div>
                  <img
                    src={movie.image}
                    alt="interstellar"
                    className="img-display"
                  />
                </div>
                <div>
                  <br />
                  <table>
                    <tbody>
                      <tr style={{ height: '10px' }}>
                        <td valign="center">
                          {/* =================================================== DISPLAY RATING =================================================== */}
                          <h4
                            style={{
                              margin: '0px',
                              marginRight: '8px',
                              fontSize: '22px',
                            }}
                          >
                            Rating:
                          </h4>
                        </td>
                        <td valign="center">
                          {' '}
                          <StarRatings
                            rating={movie.rating}
                            numberOfStars={5}
                            name="rating"
                            starSpacing="2px"
                            starDimension="28px"
                            starRatedColor="#daba2f"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <br />
                  {/* =================================================== USER RATES MOVIE =================================================== */}
                  <h4>Rate this movie!</h4>
                  <p>(can only rate movie once)</p>
                  <StarRatings
                    rating={rating}
                    starHoverColor="#daba2f"
                    starRatedColor="#daba2f"
                    changeRating={changeRating}
                    numberOfStars={5}
                    name="rating"
                    starSpacing="4px"
                    starDimension="40px"
                  />
                </div>
              </td>
              <td className="right-side" valign="top">
                <br />
                {/* =================================================== DISPLAY PLOT =================================================== */}
                <div className="description">
                  <h3>Plot</h3>
                  <p style={{ paddingLeft: '20px' }}>{movie.plot}</p>
                </div>

                {/* =================================================== DISPLAY RUNTIME =================================================== */}
                <div className="description">
                  <h3>Runtime</h3>
                  <p style={{ paddingLeft: '20px' }}>{movie.runtime}</p>
                </div>

                {/* =================================================== DISPLAY GENRE =================================================== */}
                <div className="description" style={{}}>
                  <h3>Genre</h3>
                  {movie.genre ? (
                    movie.genre.map((g) => (
                      <p style={{ paddingLeft: '20px', display: 'inline' }}>
                        {g}
                      </p>
                    ))
                  ) : (
                    <p>N/A</p>
                  )}
                </div>

                {/* =================================================== DISPLAY DIRECTOR / CREATOR =================================================== */}
                <div className="description">
                  {movie.director ? (
                    <div>
                      <h3>Director</h3>
                      <p style={{ paddingLeft: '20px' }}>{movie.director}</p>
                    </div>
                  ) : (
                    <div>
                      {' '}
                      <h3>Creator</h3>
                      <p style={{ paddingLeft: '20px' }}>
                        {' '}
                        {movie.creator ? (
                          movie.creator.map((c) => (
                            <p
                              style={{ paddingLeft: '20px', display: 'inline' }}
                            >
                              {c}
                            </p>
                          ))
                        ) : (
                          <p></p>
                        )}
                      </p>
                    </div>
                  )}
                </div>

                {/* =================================================== DISPLAY CAST =================================================== */}
                <div className="description">
                  <h3>Cast</h3>
                  <ul style={{ fontSize: '18px' }}>
                    {/* <li>Matthew McConaughey</li>
                  <li>Anne Hathaway</li>
                  <li>Michael Caine</li>
                  <li>Jessica Chastain</li>
                  <li>Mackenzie Foy</li>
                  <li>Ellen Burstyn</li>
                  <li>John Lithgow</li>
                  <li>Timothée Chalamet</li>
                  <li>David Oyelowo</li> */}
                    {movie.cast ? (
                      movie.cast.map((c) => <li>{c}</li>)
                    ) : (
                      <p>N/A</p>
                    )}
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
