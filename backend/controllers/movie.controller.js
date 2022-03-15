const db = require('../models');
const Movie = db.movie;

exports.addMovie = (req, res) => {
  const genreArray = req.body.genre.map((x) => x.toString());
  const castArray = req.body.cast.map((x) => x.toString());
  const creatorArray = req.body.creator.map((x) => x.toString());
  const movie = new Movie({
    title: req.body.title,
    year: req.body.year,
    rating: req.body.rating,
    plot: req.body.plot,
    runtime: req.body.runtime,
    genre: genreArray,
    director: req.body.director,
    creator: creatorArray,
    cast: castArray,
    filmType: req.body.filmType,
    image: req.body.image,
  });

  movie.save((err, movie) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  });
};

exports.findMovie = (req, res) => {
  //console.log('req.body.id ', req.params.id);
  Movie.findById(req.params.id).exec((err, movie) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!movie) {
      return res.status(404).send({ message: 'Movie not found.' });
    }

    res.send(movie);
  });
};

// exports.findMovie = (req, res) => {
//   console.log('req.body.id ', req.params.id);
//   Movie.findOne({
//     title: req.params.name,
//   }).exec((err, movie) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }

//     if (!movie) {
//       return res.status(404).send({ message: 'Movie not found.' });
//     }

//     res.send(movie);
//   });
// };

exports.allMovies = (req, res, next) => {
  Movie.find((error, movies) => {
    //console.log('controller ', movies);
    if (error) {
      return next(error);
    }
    res.json(movies);
  });
};

// exports.allMovies = (req, res) => {
//   console.log('all movies - controller');
//   Movie.find({}).then((error, movies) => {
//     console.log(movies);
//     if (error) {
//       return error;
//     }

//     res.send(movies);
//   });
// };
