var _             = require('lodash');
var Promise       = require('bluebird');
var bcrypt        = require('bcrypt-nodejs');
var jwt           = require('jsonwebtoken');

module.exports = function(api, Sequelize) {

  /**
   * login
   *
   * @param {string} email
   * @param {string} password
   * @promise {object}
   */
  function login(email, password)
  {
    var User = api.model.rds.User;

    // get user
    return User.findOne({
      attributes: ['user_id', 'password'],
      where: {
        email: email
      },
    }, {raw: true})
    .then(function(row) {
      // user doesn't exist
      if (row === null) {
        throw new Error("User doesn't exist");
      }

      // verify password
      if (bcrypt.compareSync(password, row.password) === false) {
        throw new Error("Password is incorrect");
      }

      // generate token
      var token = jwt.sign({user_id: row.user_id}, api.config.auth.token.secret, api.config.auth.token.options);

      return {
        user_id: row.user_id,
        token: token
      };
    });
  }

  function loginAuto(token)
  {
    return new Promise(function(resolve, reject) {

      // verify token
      jwt.verify(token, api.config.auth.token.secret, function(err, decoded) {

        // check err
        if (err) {
           if (err.name === 'TokenExpiredError') {
            return reject('Token is expired');
          } else {
            return reject('Invalid token');
          }
        }

        // generate token
        var user_id = decoded.user_id;
        var token = jwt.sign({user_id: user_id}, api.config.auth.token.secret, api.config.auth.token.options);

        // result
        return resolve({
          user_id: user_id,
          token: token
        });
      });

    });
  }

  function logout()
  {

  }

  function queryUsers()
  {

  }

  /**
   * Create a user
   *
   * @param {string} email
   * @param {string} password
   * @promise {user} - A user model instance
   */
  function createUser(email, password)
  {
    var User = api.model.rds.User;

    // get user
    return User.findOne({
      where: {
        email: email
      }
    }, {raw: true})
    .then(function(row) {
      // user exists
      if (row) {
        throw new Error('This email address has been used');
      }

      // hash password
      var hash = bcrypt.hashSync(password);

      // create user
      return User.create({
        email: email,
        password: hash
      });
    });
  }

  function getUser()
  {
    
  }

  function updateUser()
  {
  
  }

  function deleteUser()
  {
  
  }

  // interface
  return {
    login:      login,
    loginAuto:  loginAuto,
    logout:     logout,
    queryUsers: queryUsers,
    createUser: createUser,
    getUser:    getUser,
    updateUser: updateUser,
    deleteUser: deleteUser
  };
};

