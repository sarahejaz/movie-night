const controller = require('../controllers/savedmovies.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post('/api/savemovie/savemovie', controller.addSavedMovie);

  app.post('/api/savemovie/removemovie', controller.removeSavedMovie);

  app.post('/api/savemovie/allsavedmovies', controller.allSavedMovies);
};
