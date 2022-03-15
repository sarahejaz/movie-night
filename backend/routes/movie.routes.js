const controller = require('../controllers/movie.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post('/api/movie/addmovie', controller.addMovie);

  /**
   * @swagger
   * /api/movie/findmovie/{id}:
   *   get:
   *     summary: Retrieve a movie
   *     description: Retrieve a movie by id
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the movie to retrieve.
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: A movie with given id.
   */
  app.get('/api/movie/findmovie/:id', controller.findMovie);

  /**
   * @swagger
   * /api/movie/allmovies:
   *   get:
   *     summary: Retrieve a list of movies
   *     description: Retrieve a list of movies
   *     responses:
   *       200:
   *         description: A list of movies.
   */
  app.get('/api/movie/allmovies', controller.allMovies);
};
