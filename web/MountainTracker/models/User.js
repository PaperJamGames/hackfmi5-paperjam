var mongoose = require('node-restful').mongoose;

var UserSchema = new mongoose.Schema({
    _id: String,
    username: String,
    password: String
});

UserSchema.methods.validPassword = function (password) {
    var doc = this._doc;

    if(doc['password'] != null && doc['password'] === password){
        return true;
    }

    return false;
}

mongoose.model('User', UserSchema);
module.exports = UserSchema;