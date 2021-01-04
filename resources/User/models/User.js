/**
 * Created by Poonam on 25/11/2019.
*/

// Model for the Event 
module.exports = (function UserSchema() {

    //var mongoose = require(appRoot + '/config/db').mongoose;
    var Schema = mongoose.Schema;

    function normalize(data) {
        try {

            return JSON.parse(data);
        } catch (err) {
            return data;
        }
    }
  var UserSchema = new Schema({
    fname: {
        type: String,
    },
    lname: {
        type: String,
    },
    city: {
        type: String,
    },
    email: {
        type: String,
    },
   
    password: {
        type: String,
    },
    createdDate:{
        type:Date,default:Date.now(),
    }

});
UserSchema.set('toObject', { getters: true });
UserSchema.set('toJSON', { getters: true });
var User = mongoose.model('User', UserSchema,'Users');

return User;
})();