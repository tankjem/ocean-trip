var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  username: String,
  avatar: String,
  email: String,
  githubId: String,
  twitterId: String,
  facebookId: String,
  passwordHash: String
});


userSchema.virtual('password')
  .set(function(password) {
    // save on the object, in case we need it later
    this._password = password;

    // hash the password and save on the passwordHash property
    this.passwordHash = bcrypt.hashSync(this._password, bcrypt.genSaltSync(8));
  });

userSchema.virtual('passwordConfirmation')
  .get(function() {
    return this._passwordConfirmation;
  })
  .set(function(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.path('passwordHash')
  .validate(function(passwordHash) {
    if(this.isNew) {
      if(!this._password) {
        // If there was no password sent from the client
        return this.invalidate('password', 'A password is required');
      }

      if(this._password !== this._passwordConfirmation) {
        // If the password and passwordConfirmation does not match
        return this.invalidate('passwordConfirmation', 'Passwords do not match');
      }
    }
  });

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.passwordHash);
}

module.exports = mongoose.model('User', userSchema);