const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Александр',
    minLength: [2, 'Must be at least 6, got {VALUE}'],
    maxLength: [30, 'Should be no more than 30, got {VALUE}'],
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Invalid email',
    },
    required: [true, 'email is required'],
  },
  password: {
    type: String,
    select: false,
    required: [true, 'password is required'],
  },
});

module.exports = mongoose.model('user', userSchema);
