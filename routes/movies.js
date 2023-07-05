const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  getmovies, delmovie, createmovie,
} = require('../controllers/movies');
const auth = require('../middlewares/auth');
const { url } = require('../const/regex');

const validateMovieId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

router.get('/', auth, getmovies);
router.delete('/:cardId', validateMovieId, auth, delmovie);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(url).required(),
    trailerLink: Joi.string().regex(url).required(),
    thumbnail: Joi.string().regex(url).required(),
    owner: Joi.string().hex().length(24).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), auth, createmovie);

module.exports = router;
