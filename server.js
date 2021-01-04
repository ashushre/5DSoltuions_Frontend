global.restify = require('restify');
const express = require('express');
const path = require("path");
const app1 = express();
global.appRoot = path.resolve(__dirname);
const multer = require("multer");
var config = require('./config/config');
global.app = restify.createServer({name:'REST-api'});
const cron = require('node-cron');

app.use(restify.fullResponse());
app.use(restify.bodyParser());
app.use(restify.queryParser());
app.use(restify.CORS());
//app.use('/hello', require('../fm_iot-1_node/resources/sendMail/hello')());
app.opts(/.*/, function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
    res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
    res.send(200);
    return next();
});


global.mongoose = require(appRoot + '/config/db').mongoose;

app.listen(config.port,()=>{
    console.log(config.port);
      var date=new Date();

        
})









global.errors = require('restify-errors');
//global.errors = require('./utils/errors');

global.config = require(appRoot + '/config/config');


global.uniqueValidator = require('mongoose-unique-validator');


global.io = require('socket.io')(app.server);



global.ErrorWrapper = require(appRoot+ '/utils/ErrorWrapper');
global.messages = require(appRoot + '/config/messages');
global.SuccessWrapper = require(appRoot+ '/utils/SuccessWrapper');

var resources = require('node-resources');
resources.registerRoutes(app, {path: __dirname + "/resources", pattern: "[folder].routes.js"});
