const db = require('../models');
const Movie = db.movie;
const User = db.user;

exports.addSavedMovie = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.body.userid },
    { $addToSet: { favorites: req.body.movieid } },
    function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
      }
    }
  );
};

exports.removeSavedMovie = (req, res) => {
  console.log('req.body.movieid ', req.body.movieid);
  User.findOneAndUpdate(
    { _id: req.body.userid },
    { $pull: { favorites: req.body.movieid } },
    function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
      }
    }
  );
};

exports.allSavedMovies = (req, res, next) => {
  User.findOne({ _id: req.body.userid }).then((user) => {
    if (user) {
      Movie.find({ _id: { $in: user.favorites } }, function (err, movies) {
        res.send(movies);
      });

      //res.json(user.favorites);
    } else {
      //   new Library({ user: req.body.userid, favourites: favouritesFields })
      //     .save()
      //     .then((library) => res.json(library));
      console.log('User not found / favorites not found');
    }
  });
};
