const jwt = require('jsonwebtoken');
const config = require('config'); 
const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    manlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    manlength: 50,
    unique : true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    manlength: 1024
  },
  isAdmin : {
    type : Boolean
  }
});

userSchema.methods.generateAuthToken = function () {
  //return jwt.sign({_id :this._id, isAdmin : this.isAdmin}, 'abc');
  return jwt.sign({_id :this._id, name: this.name, isAdmin : this.isAdmin}, process.env.vidly_jwtPrivateKey);
}

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(50).required()
  });

  return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;