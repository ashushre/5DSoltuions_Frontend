var MemoCtrl = require('./controller/MemoCtrl');

module.exports = function (app) {
    app.get("/api/GetAllMemo", MemoCtrl.GetAllMemo);
    app.post("/api/addNewMemo", MemoCtrl.addNewMemo);


    
};