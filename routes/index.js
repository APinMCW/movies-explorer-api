const { errors } = require('celebrate');
const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');

const userRoutes = require('./users');
const movieRoutes = require('./movies');
const authRoutes = require('./auth');

router.use('/', authRoutes);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

router.use(errors());

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница по указанному маршруту не найдена'));
});

module.exports = router;
