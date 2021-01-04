
function ImageuploadCtrl() {

  const express = require('express');
  const app = express();
  const multer = require("multer");
  const path = require("path");
  var cors = require('cors')
  // storage engine 
  
  const storage = multer.diskStorage({
      destination: './upload/images',
      filename: (req, file, cb) => {
          return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
      }
  })
  
  const upload = multer({
      storage: storage,
      limits: {
          fileSize: 1000
      }
  })
  app.use('/profile', express.static('upload/images'));
  app.post("/upload", upload.single('profile'), (req, res) => {
  
      res.send({
          success: 1,
          profile_url: `http://localhost:4000/profile/${req.file.filename}`
      })
      //return SuccessWrapper.SuccessResponse(messages.successStatus, res, results);

  })
  
  function errHandler(err, req, res, next) {
      if (err instanceof multer.MulterError) {
          // res.json({
          //     success: 0,
          //     message: err.message
          // })
          var results={};
          result={
            success: 0,
            message: err.message
          }
          return SuccessWrapper.SuccessResponse(messages.successStatus, res, results);

      }
  }
  app.use(errHandler);
  app.use(cors)
  app.listen(4001, () => {
      console.log("server up and running");
  })
}

module.exports = new ImageuploadCtrl();