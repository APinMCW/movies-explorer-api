const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const {
  updProfile,
  getUserInfo,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/me', auth, getUserInfo);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), auth, updProfile);

module.exports = router;
