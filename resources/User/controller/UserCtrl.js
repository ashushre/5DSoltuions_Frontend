
function UserCtrl() {

  'use strict';
  var self = this;

  var User = require('../models/User');
  var ObjectId = require('mongodb').ObjectId;
  var async = require('async');
  config = require('../../../config/config');
  var dbPath = config.dbPath;


  this.GetAllUser = function (req, res, next) {
    console.log("ala re", "customer");
    try {
      async.waterfall([
        function GetUserData(callback) {
          User.find({}).exec(function (err, results) {
            if (err) {
              callback(err, null);
            }
            //  console.log(results)
            callback(null, results);
          })
        },
      ], function (err, results) {
        //  console.log("hello")
        if (err) {
          //  console.log("hello1")

          return next(restify.errors.InternalServerError('Internal server error'));

        } else {


          return SuccessWrapper.SuccessResponse(messages.successStatus, res, results);

        }
      });

    } catch (err) {
      //   console.log(err)

      return next(new restify.errors.InternalServerError('Internal server error' + err));

    }

  };

  this.getlogin = function (req, res, next) {
    try {

      var query = { email: req.body.email, password: req.body.password }

      User.find(query).exec(function (err, result) {
        if (err) {
          return next(new restify.errors.InternalServerError('Internal server error' + err));
        }
        // res.send(result);
        if (result.length == 0) {

          var response = {};

          return SuccessWrapper.SuccessResponse(messages.errorStatus, res, response, "Invalid Credintail");
        }
        else {

          var response = {};
          response.data = result;

          return SuccessWrapper.SuccessResponse(messages.successStatus, res, response, "Login Successfully");
        }

      });

    } catch (err) {
      // console.log(err)

      return next(new restify.errors.InternalServerError('Internal server error' + err));

    }

  };
  this.addNewUser = function (req, res, next) {
    try {
      var uid = generate(4);
      let newUser = new User(req.body);
      var query1 = { email: req.body.email }
      User.find(query1).exec(function (err, response) {
        if (err) {
          return next(new restify.errors.InternalServerError('Internal server error' + err));

        }
        if (response.length > 0) {
          var data = [];
          return SuccessWrapper.SuccessResponse(messages.successStatus, res, data, "Already username exist");

        }
        else {
          newUser.save((err, result) => {
            if (err) {
              return next(new restify.errors.InternalServerError('Internal server error' + err));

            }



            return SuccessWrapper.SuccessResponse(messages.successStatus, res, result);

          });
        }
      })




    } catch (err) {
      console.log(err)

      return next(new restify.errors.InternalServerError('Internal server error' + err));

    }

  };

  this.getlogout = function (req, res, next) {
    try {

      var query = { username: req.body.user, password: req.body.password }
      let obj = {
        deviceId: req.body.deviceId,
        deviceType: req.body.deviceType
      }
      var update = obj;
      var options = { upsert: true };
      console.log(query)



      User.findOneAndUpdate(query, { $pull: { token: req.body.token } }, function (err, ress) {

        if (err) {
          return next(new restify.errors.InternalServerError('Internal server error' + err));

        }
        if (result.length == 0) {

          var response = {};

          return SuccessWrapper.SuccessResponse(messages.errorStatus, res, response, "Invalid Credintail");
        }
        else {

          var response = {};
          response.data = result;

          return SuccessWrapper.SuccessResponse(messages.successStatus, res, response, "Logout Successfully");
        }

        // res.send(result);


      });

    } catch (err) {
      // console.log(err)

      return next(new restify.errors.InternalServerError('Internal server error' + err));

    }

  };

  function generate(n) {
    var add = 1,
      max = 12 - add;

    if (n > max) {
      return generate(max) + generate(n - max);
    }

    max = Math.pow(10, n + add);
    var min = max / 10; // Math.pow(10, n) basically 
    var number = Math.floor(Math.random() * (max - min + 1)) + min;

    return ("" + number).substring(add);
  }
}

module.exports = new UserCtrl();