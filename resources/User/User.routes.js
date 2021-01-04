var UserCtrl = require('./controller/UserCtrl');

module.exports = function (app) {
   
   app.post("/api/login", UserCtrl.getlogin);
   app.get("/api/GetAllUser", UserCtrl.GetAllUser);
   app.post("/api/signup", UserCtrl.addNewUser);



    
};