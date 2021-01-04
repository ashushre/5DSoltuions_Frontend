/**
 * Created by Poonam on 25/11/2019.
*/

// Model for the Event 
module.exports = (function MemoSchema() {

    //var mongoose = require(appRoot + '/config/db').mongoose;
    var Schema = mongoose.Schema;

    function normalize(data) {
        try {

            return JSON.parse(data);
        } catch (err) {
            return data;
        }
    }
  var MemoSchema = new Schema({
    tag: {
        type: String,
    },
    title: {
        type: String,
    },
    url: {
        type: String,
    },
    createdDate:{
        type:Date,default:Date.now(),
    }

});
MemoSchema.set('toObject', { getters: true });
MemoSchema.set('toJSON', { getters: true });
var Memo = mongoose.model('Memo', MemoSchema,'Memos');

return Memo;
})();