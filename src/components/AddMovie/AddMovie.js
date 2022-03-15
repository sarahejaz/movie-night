import React, { useState, useCallback, useEffect } from 'react';
import './AddMovie.css';
import { Button, Modal } from 'react-bootstrap';
import { Formik, Field, FieldArray } from 'formik';
import { useHistory } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import MovieService from '../../services/movie.service';
import Cropper from 'react-easy-crop';
import AuthService from '../../services/auth.service';

export default function AddMovie() {
  const [rating, setRating] = useState(0);
  const [img, setImg] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [imgUploaded, setImgUploaded] = useState(false);
  const [openModal, setOpenModal] = useState(true);
  const [croppedImg, setCroppedImg] = useState('');
  //const [rateOnce, setRateOnce] = useState(false);
  const [admin, setAdmin] = useState('');

  useEffect(() => {
    if (AuthService.getCurrentAdmin() != null) {
      setAdmin(AuthService.getCurrentAdmin().username);
    } else {
      setAdmin('');
    }
  }, []);

  const getYears = () => {
    //new Date().getFullYear()
    const years = [];
    const oldestYear = 1930;
    const diff = new Date().getFullYear() - oldestYear;
    for (let i = 0; i < diff + 1; i++) {
      years.push(i + oldestYear);
      //console.log('years ', years);
    }
    return years;
  };

  const genres = [
    'Action',
    'Adventure',
    'Comedy',
    'Crime and mystery',
    'Fantasy',
    'Historical',
    'Historical fiction',
    'Horror',
    'Romance',
    'Satire',
    'Science fiction',
    'Speculative',
    'Thriller',
    'Western',
    'Other',
  ];

  const changeRating = (newRating) => {
    setRating(newRating);
  };

  const history = useHistory();

  const routeChange = () => {
    let path = `/`;
    history.push(path);
    //window.location.reload();
  };

  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onFileChange = async (e) => {
    // if (e.target.files && e.target.files.length > 0) {
    //   const file = e.target.files[0];
    //   let imageDataUrl = await readFile(file);
    //   console.log('e.target.files[0] ', e.target.files[0]);
    //   setImg(imageDataUrl);
    // }

    // if (e.target.files && e.target.files.length > 0) {
    //   const reader = new FileReader();
    //   reader.addEventListener('load', () => setImg(reader.result));
    //   reader.readAsDataURL(e.target.files[0]);
    //   console.log('typeof e.target.files[0] ' + typeof e.target.files[0]);
    // }

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      setImg(imageDataUrl);
    }
  };

  // const showCroppedImage = useCallback(async () => {
  //   try {
  //     const croppedImage = await getCroppedImg(
  //       imageSrc,
  //       croppedAreaPixels,
  //       rotation
  //     );
  //     console.log('donee', { croppedImage });
  //     setCroppedImage(croppedImage);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, [imageSrc, croppedAreaPixels, rotation]);

  async function showCroppedImage() {
    if (img && croppedAreaPixels.width && croppedAreaPixels.height) {
      const croppedImageUrl = await getCroppedImage();
      //console.log(croppedImageUrl);
    }
  }

  async function getCroppedImage() {
    //console.log('cropped area pixels ', croppedAreaPixels);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const new_img = new Image();
    new Promise((resolve, reject) => {
      new_img.addEventListener('load', () => resolve(new_img));
      new_img.addEventListener('error', (error) => reject(error));
      new_img.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
      new_img.src = img;
    });

    const scaleX = new_img.naturalWidth / new_img.width;
    const scaleY = new_img.naturalHeight / new_img.height;
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    //let new_img = new Image(img);

    //const image = await createImageBitmap(img);
    ctx.drawImage(
      new_img,
      croppedAreaPixels.x * scaleX,
      croppedAreaPixels.y * scaleY,
      croppedAreaPixels.width * scaleX,
      croppedAreaPixels.height * scaleY,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    var canvas_img = new Image();
    canvas_img.src = canvas.toDataURL();
    setCroppedImg(canvas_img.src);

    setOpenModal(false);
    setImgUploaded(true);

    // return new Promise((resolve, reject) => {
    //   canvas.toBlob((blob) => {
    //     if (!blob) {
    //       console.error('Canvas is empty');
    //       return;
    //     }
    //     //blob.name = fileName;
    //     // window.URL.revokeObjectURL(fileUrl);
    //     // fileUrl = window.URL.createObjectURL(blob);
    //     blob.name = new_img.src;
    //     setImg(blob);
    //     console.log('blob!!!! ', blob);
    //     //resolve(fileUrl);
    //   }, 'image/jpeg');
    // });

    // return new Promise((resolve) => {
    //   canvas.toBlob((file) => {
    //     console.log('toBlob file ', file);
    //     setImg(file);
    //     resolve(URL.createObjectURL(file));
    //   }, 'image/png');
    // });
  }

  return (
    <div>
      {admin === '' ? (
        routeChange()
      ) : (
        <Formik
          initialValues={{
            title: '',
            year: '',
            rating: rating,
            plot: '',
            runtimehr: '',
            runtimemin: '',
            genre: [''],
            director: '',
            creators: [''],
            cast: [''],
            filmType: '',
            image: '',
          }}
          validate={(values) => {
            const errors = {};
            if (!values.title) {
              errors.title = 'Required';
            }

            if (!values.year) {
              errors.year = 'Required';
            }

            values.rating = rating;
            if (values.rating === 0) {
              // console.log(
              //   'rating state ',
              //   rating,
              //   ' values.rating ',
              //   values.rating
              // );
              errors.rating = 'Required';
            }

            if (!values.plot) {
              errors.plot = 'Required';
            }

            // if (!values.runtime) {
            //   errors.runtime = 'Required';
            // }
            if (!values.runtimehr) {
              errors.runtimehr = 'Hours Required';
            }

            if (!values.runtimemin) {
              errors.runtimemin = 'Minutes Required';
            }

            // if (!values.genre) {
            //   errors.genre = 'Required';
            // }

            // if (!values.cast) {
            //   errors.cast = 'Required';
            // }

            if (!values.filmType) {
              errors.filmType = 'Required';
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            //console.log('onsubmit values = ', values);

            if (croppedImg === '') {
              values.image = 'images/default-movie-img.png';
            } else {
              values.image = croppedImg;
            }
            console.log('image ', values.image);
            const runtime =
              values.runtimehr + ' hours ' + values.runtimemin + ' minutes';

            setTimeout(() => {
              //alert(JSON.stringify(values, null, 2));
              MovieService.addMovie(
                values.title,
                values.year,
                values.rating,
                values.plot,
                runtime,
                values.genre,
                values.director,
                values.creators,
                values.cast,
                values.filmType,
                values.image
              ).then(
                () => {
                  alert('Movie added');
                  console.log('movie added');
                },
                (error) => {
                  const resMessage =
                    (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                    error.message ||
                    error.toString();
                  console.log(resMessage);
                  alert(resMessage);
                }
              );
              setSubmitting(false);
              routeChange();
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            /* and other goodies */
          }) => (
            <div className="add-movie-div">
              <h1 className="add-movie-heading">Add Movie</h1>
              <form onSubmit={handleSubmit}>
                <table style={{ width: '99%', color: 'black' }}>
                  <tr>
                    <td className="left-side" valign="top">
                      {' '}
                      <div
                        style={{ paddingLeft: '10px', paddingRight: '10px' }}
                      >
                        {/* =================================================== INPUT IMAGE =================================================== */}
                        <div className="add-movie-description">
                          <h3 style={{ textAlign: 'center' }}>Image</h3>
                          <div className="add-movie-input-div">
                            {' '}
                            {img ? (
                              <div>
                                {/* <div
                            style={{
                              height: '900px',
                              width: '800px',
                              position: 'absolute',
                              top: '0px',
                            }}
                          > */}
                                <Modal
                                  centered
                                  show={openModal}
                                  contentClassName="img-modal"
                                >
                                  <Modal.Body>
                                    <div
                                      style={{
                                        position: 'relative',
                                        width: '100%',
                                        height: 500,
                                        textAlign: 'center',
                                      }}
                                    >
                                      <Cropper
                                        image={img}
                                        crop={crop}
                                        zoom={zoom}
                                        aspect={2 / 3}
                                        onCropChange={setCrop}
                                        onCropComplete={onCropComplete}
                                        onZoomChange={setZoom}
                                      />
                                    </div>
                                    <Button
                                      onClick={showCroppedImage}
                                      variant="primary"
                                      disabled={isSubmitting}
                                      style={{
                                        marginTop: '30px',
                                        marginBottom: '30px',
                                        backgroundColor: '#e0662d',
                                        border: 'none',
                                        height: '50px',
                                        width: '100%',
                                        fontSize: '22px',
                                      }}
                                    >
                                      Crop
                                    </Button>
                                  </Modal.Body>
                                </Modal>
                              </div>
                            ) : (
                              <div style={{ textAlign: 'center' }}>
                                <img
                                  src={'images/default-movie-img.png'}
                                  alt={'Default'}
                                  style={{ height: '333px', width: '222px' }}
                                />
                                <input
                                  type="file"
                                  onChange={onFileChange}
                                  accept="image/*"
                                  name="image"
                                  onBlur={handleBlur}
                                  placeholder="Image"
                                  style={{ fontSize: '18px', width: '100%' }}
                                />
                              </div>
                            )}
                            {imgUploaded ? (
                              <div style={{ textAlign: 'center' }}>
                                <img
                                  src={croppedImg}
                                  alt={'Error'}
                                  style={{ height: '333px', width: '222px' }}
                                />
                              </div>
                            ) : (
                              <p></p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div>
                        <br />

                        {/* =================================================== RATE MOVIE =================================================== */}
                        <h4
                          style={{
                            margin: '0px',
                            fontSize: '20px',
                            marginBottom: '12px',
                          }}
                        >
                          Rate:
                        </h4>
                        <StarRatings
                          rating={rating}
                          starHoverColor="#daba2f"
                          starRatedColor="#daba2f"
                          changeRating={changeRating}
                          numberOfStars={5}
                          name="rating"
                          starSpacing="2px"
                          starDimension="36px"
                          value={values.rating}
                        />
                        {errors.rating && touched.rating && errors.rating ? (
                          <div
                            style={{
                              color: 'red',
                              fontSize: '12px',
                              margin: '0',
                              padding: '0',
                            }}
                          >
                            <p>{errors.rating}</p>
                          </div>
                        ) : (
                          <div
                            style={{
                              color: 'red',
                              fontSize: '12px',
                              margin: '0',
                              padding: '0',
                              visibility: 'hidden',
                            }}
                          >
                            <p>temp</p>
                          </div>
                        )}
                        <br />
                      </div>
                    </td>
                    <td className="right-side" valign="top">
                      <br />

                      {/* =================================================== INPUT TITLE =================================================== */}
                      <div className="add-movie-description">
                        <h3>Title</h3>
                        <div className="add-movie-input-div">
                          {' '}
                          <input
                            type="title"
                            name="title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title}
                            placeholder="Title"
                          />
                          {errors.title && touched.title && errors.title ? (
                            <div
                              style={{
                                color: 'red',
                                fontSize: '12px',
                                margin: '0',
                                padding: '0',
                              }}
                            >
                              <p>{errors.title}</p>
                            </div>
                          ) : (
                            <div
                              style={{
                                color: 'red',
                                fontSize: '12px',
                                margin: '0',
                                padding: '0',
                                visibility: 'hidden',
                              }}
                            >
                              <p>temp</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* =================================================== INPUT YEAR =================================================== */}
                      <div className="add-movie-description">
                        <h3>Year</h3>
                        <div className="add-movie-input-div">
                          <Field
                            as="select"
                            name="year"
                            onChange={handleChange}
                            value={values.year}
                            className="drop-down-input"
                          >
                            <option disabled value="">
                              Select year...
                            </option>
                            {getYears().map((year) => (
                              <option value={year} key={year}>
                                {year}
                              </option>
                            ))}
                            {errors.year && touched.year && errors.year ? (
                              <div
                                style={{
                                  color: 'red',
                                  fontSize: '12px',
                                  margin: '0',
                                  padding: '0',
                                }}
                              >
                                <p>{errors.year}</p>
                              </div>
                            ) : (
                              <div
                                style={{
                                  color: 'red',
                                  fontSize: '12px',
                                  margin: '0',
                                  padding: '0',
                                  visibility: 'hidden',
                                }}
                              >
                                <p>temp</p>
                              </div>
                            )}
                          </Field>
                        </div>
                      </div>

                      {/* =================================================== INPUT PLOT =================================================== */}
                      <div className="add-movie-description">
                        <h3>Plot</h3>
                        <div className="add-movie-input-div">
                          {' '}
                          <textarea
                            name="plot"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.plot}
                            placeholder="Plot"
                            rows="4"
                            cols="50"
                            wrap="soft"
                          />
                          {errors.plot && touched.plot && errors.plot ? (
                            <div
                              style={{
                                color: 'red',
                                fontSize: '12px',
                                margin: '0',
                                padding: '0',
                              }}
                            >
                              <p>{errors.plot}</p>
                            </div>
                          ) : (
                            <div
                              style={{
                                color: 'red',
                                fontSize: '12px',
                                margin: '0',
                                padding: '0',
                                visibility: 'hidden',
                              }}
                            >
                              <p>temp</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* =================================================== INPUT RUNTIME =================================================== */}
                      <div className="add-movie-description">
                        <h3>Runtime</h3>
                        <div className="add-movie-input-div">
                          {' '}
                          {/* ========= INPUT HOURS ========= */}
                          <input
                            type="runtimehr"
                            name="runtimehr"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.runtimehr}
                            placeholder="Hours"
                            style={{ width: '20%' }}
                          />
                          <p
                            style={{
                              display: 'inline',
                              marginLeft: '1%',
                              marginRight: '2%',
                            }}
                          >
                            {' '}
                            hours{' '}
                          </p>
                          {/* ========= INPUT MINUTES ========= */}
                          <input
                            type="runtimemin"
                            name="runtimemin"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.runtimemin}
                            placeholder="Minutes"
                            style={{ width: '20%' }}
                          />
                          <p
                            style={{
                              display: 'inline',
                              marginLeft: '1%',
                              marginRight: '2%',
                            }}
                          >
                            {' '}
                            minutes{' '}
                          </p>
                          {errors.runtimehr &&
                          touched.runtimehr &&
                          errors.runtimehr ? (
                            <div
                              style={{
                                color: 'red',
                                fontSize: '12px',
                                margin: '0',
                                padding: '0',
                              }}
                            >
                              <p>{errors.runtimehr}</p>
                            </div>
                          ) : (
                            <div
                              style={{
                                color: 'red',
                                fontSize: '12px',
                                margin: '0',
                                padding: '0',
                                visibility: 'hidden',
                              }}
                            >
                              <p>temp</p>
                            </div>
                          )}
                          {errors.runtimemin &&
                          touched.runtimemin &&
                          errors.runtimemin ? (
                            <div
                              style={{
                                color: 'red',
                                fontSize: '12px',
                                margin: '0',
                                padding: '0',
                              }}
                            >
                              <p>{errors.runtimemin}</p>
                            </div>
                          ) : (
                            <div
                              style={{
                                color: 'red',
                                fontSize: '12px',
                                margin: '0',
                                padding: '0',
                                visibility: 'hidden',
                              }}
                            >
                              <p>temp</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* =================================================== INPUT GENRE =================================================== */}
                      <div className="add-movie-description">
                        <h3>Genre</h3>
                        <div className="add-movie-input-div">
                          <FieldArray
                            name="genre"
                            render={(arrayHelpers) => (
                              <div>
                                {values.genre && values.genre.length > 0 ? (
                                  values.genre.map((g, index) => (
                                    <div key={index}>
                                      <Field
                                        as="select"
                                        name={`genre.${index}`}
                                        placeholder="Genre..."
                                        className="drop-down-input"
                                        style={{ width: '50%' }}
                                      >
                                        <option disabled value="">
                                          Select genre...
                                        </option>
                                        {genres.map((gen) => (
                                          <option value={gen} key={gen}>
                                            {gen}
                                          </option>
                                        ))}
                                      </Field>
                                      <button
                                        type="button"
                                        className="add-remove-buttons"
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        } // remove a friend from the list
                                      >
                                        -
                                      </button>
                                      <button
                                        type="button"
                                        className="add-remove-buttons"
                                        onClick={() =>
                                          arrayHelpers.insert(index, '')
                                        } // insert an empty string at a position
                                      >
                                        +
                                      </button>
                                    </div>
                                  ))
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => arrayHelpers.push('')}
                                    className="add-remove-buttons"
                                    style={{ width: '200px' }}
                                  >
                                    {/* show this when user has removed all friends from the list */}
                                    Add a genre
                                  </button>
                                )}
                                {/* <div>
                                <button type="submit">Submit</button>
                              </div> */}
                              </div>
                            )}
                          />
                        </div>
                      </div>

                      {/* =================================================== INPUT FILMTYPE =================================================== */}
                      <div className="add-movie-description">
                        <h3>Type</h3>
                        <div className="add-movie-input-div">
                          <Field
                            as="select"
                            name="filmType"
                            className="drop-down-input"
                          >
                            <option disabled value="">
                              Select type...
                            </option>
                            <option value="movie">Movie</option>
                            <option value="show">Show</option>
                          </Field>
                        </div>
                      </div>

                      {/* =================================================== INPUT DIRECTOR / CREATOR =================================================== */}
                      {values.filmType.toLowerCase() === 'show' ? (
                        <div className="add-movie-description">
                          {/* <div className="add-movie-input-div">
                          {' '}
                          <input
                            type="creator"
                            name="creator"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.creator}
                            placeholder="Creator"
                          />
                          {errors.creator &&
                          touched.creator &&
                          errors.creator ? (
                            <div
                              style={{
                                color: 'red',
                                fontSize: '12px',
                                margin: '0',
                                padding: '0',
                              }}
                            >
                              <p>{errors.creator}</p>
                            </div>
                          ) : (
                            <div
                              style={{
                                color: 'red',
                                fontSize: '12px',
                                margin: '0',
                                padding: '0',
                                visibility: 'hidden',
                              }}
                            >
                              <p>temp</p>
                            </div>
                          )}
                        </div> */}

                          <h3>Creator(s)</h3>
                          <div className="add-movie-input-div">
                            <FieldArray
                              name="creators"
                              render={(arrayHelpers) => (
                                <div>
                                  {values.creators &&
                                  values.creators.length > 0 ? (
                                    values.creators.map((c, index) => (
                                      <div key={index}>
                                        <Field
                                          name={`creators.${index}`}
                                          className="add-values-input"
                                          placeholder="Creator..."
                                        />
                                        <button
                                          type="button"
                                          className="add-remove-buttons"
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          } // remove a friend from the list
                                        >
                                          -
                                        </button>
                                        <button
                                          type="button"
                                          className="add-remove-buttons"
                                          onClick={() =>
                                            arrayHelpers.insert(index, '')
                                          } // insert an empty string at a position
                                        >
                                          +
                                        </button>
                                      </div>
                                    ))
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => arrayHelpers.push('')}
                                      className="add-remove-buttons"
                                      style={{ width: '200px' }}
                                    >
                                      {/* show this when user has removed all cast members from the list */}
                                      Add a show creator
                                    </button>
                                  )}
                                  {/* <div>
                                <button type="submit">Submit</button>
                              </div> */}
                                </div>
                              )}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="add-movie-description">
                          <h3>Director</h3>
                          <div className="add-movie-input-div">
                            {' '}
                            <input
                              type="director"
                              name="director"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.director}
                              placeholder="Director"
                            />
                            {errors.director &&
                            touched.director &&
                            errors.director ? (
                              <div
                                style={{
                                  color: 'red',
                                  fontSize: '12px',
                                  margin: '0',
                                  padding: '0',
                                }}
                              >
                                <p>{errors.director}</p>
                              </div>
                            ) : (
                              <div
                                style={{
                                  color: 'red',
                                  fontSize: '12px',
                                  margin: '0',
                                  padding: '0',
                                  visibility: 'hidden',
                                }}
                              >
                                <p>temp</p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* =================================================== INPUT CAST =================================================== */}
                      <div className="add-movie-description">
                        <h3>Cast</h3>
                        <div className="add-movie-input-div">
                          <FieldArray
                            name="cast"
                            render={(arrayHelpers) => (
                              <div>
                                {values.cast && values.cast.length > 0 ? (
                                  values.cast.map((c, index) => (
                                    <div key={index}>
                                      <Field
                                        name={`cast.${index}`}
                                        className="add-values-input"
                                        placeholder="Cast member..."
                                      />
                                      <button
                                        type="button"
                                        className="add-remove-buttons"
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        } // remove a friend from the list
                                      >
                                        -
                                      </button>
                                      <button
                                        type="button"
                                        className="add-remove-buttons"
                                        onClick={() =>
                                          arrayHelpers.insert(index, '')
                                        } // insert an empty string at a position
                                      >
                                        +
                                      </button>
                                    </div>
                                  ))
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => arrayHelpers.push('')}
                                    className="add-remove-buttons"
                                    style={{ width: '200px' }}
                                  >
                                    {/* show this when user has removed all cast members from the list */}
                                    Add a cast member
                                  </button>
                                )}
                                {/* <div>
                                <button type="submit">Submit</button>
                              </div> */}
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
                {/* =================================================== SUBMIT BUTTON =================================================== */}
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    marginTop: '30px',
                    marginBottom: '30px',
                    backgroundColor: '#e0662d',
                    border: 'none',
                    height: '50px',
                    width: '170px',
                    fontSize: '22px',
                  }}
                >
                  Add Movie
                </Button>{' '}
              </form>
            </div>
          )}
        </Formik>
      )}
    </div>
  );
}
