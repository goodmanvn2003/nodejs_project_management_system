var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var taskSchema = new Schema({
    name: String,
    start_date : Date,
    end_date: Date,
    priority: String,
    details: String,
    user: String
    // user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Task', taskSchema);