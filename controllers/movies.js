const Error = require('mongoose');
const Movie = require('../models/movie');
const statusCode = require('../const/statusCode');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

// GET /movies/
const getmovies = (req, res, next) => {
  Movie.find({}).then((movies) => {
    res.status(statusCode.OK).send(movies.reverse());
  }).catch(next);
};

// DELETE /movies/:moviesId
const delmovie = (req, res, next) => {
  const { movieId } = req.params;
  const user = req.user._id;
  Movie.findById(movieId)
    .then((movie) => {
      if (movie === null) {
        throw new NotFoundError(`Карточка с указанным id:${movieId} не найдена.`);
      }
      const owner = movie.owner.toString();
      if (user === owner) {
        Movie.findByIdAndRemove(movieId)
          .then((copy) => {
            if (copy === null) {
              throw new NotFoundError(`Карточка с указанным id:${movieId} не найдена.`);
            }
            res.status(statusCode.OK).send(copy);
          })
          .catch((err) => {
            if (err instanceof Error.CastError) {
              throw new BadRequestError(`Передан несуществующий id:${movieId} карточки.`);
            } else {
              next(err);
            }
          });
      } else {
        throw new ForbiddenError('Нет прав доступа');
      }
    })
    .catch((err) => {
      if (err instanceof Error.CastError) {
        throw new BadRequestError(`Передан несуществующий id:${movieId} карточки.`);
      } else {
        next(err);
      }
    });
};

// POST /movies/
const createmovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.create([req.body], { owner })
    .then((movie) => {
      res.status(statusCode.CREATED).send(movie);
    })
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        throw new BadRequestError(`Переданы некорректные данные при создании карточки. ${err}`);
      } else {
        next(err);
      }
    });
};

module.exports = {
  getmovies, delmovie, createmovie,
};
