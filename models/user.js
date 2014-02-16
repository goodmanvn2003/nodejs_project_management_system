var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
   user_name : String,
   password_hash : String,
   role : String,
   recovery_token : String,
   user_details :
   {
       name : String,
       email_address: String
   },
   description : String,
   login_count : Number,
   created_at : Date
});

module.exports = mongoose.model('User', userSchema);