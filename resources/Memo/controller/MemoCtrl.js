
function MemoCtrl() {

    'use strict';
    var self = this;
  
    var Memo = require('../models/Memo');
    var ObjectId = require('mongodb').ObjectId;
    var async = require('async');
    config = require('../../../config/config');
    var dbPath = config.dbPath;
  
  
    this.GetAllMemo = function (req, res, next) {
      console.log("ala re", "customer");
      try {
        async.waterfall([
          function GetMemoData(callback) {
            Memo.find({}).exec(function (err, results) {
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
  
    this.addNewMemo = function (req, res, next) {
      try {
        let newMemo = new Memo(req.body);
    
            newMemo.save((err, result) => {
              if (err) {
                return next(new restify.errors.InternalServerError('Internal server error' + err));
  
              }
  
  
  
              return SuccessWrapper.SuccessResponse(messages.successStatus, res, result);
  
            });
        
  
  
  
  
      } catch (err) {
        console.log(err)
  
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
  
  module.exports = new MemoCtrl();