const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  authority: {
    type: String,
    enum: ['clientUser', 'clientManger' ,'technician'],
    required: true
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File'
  },
  valid: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
