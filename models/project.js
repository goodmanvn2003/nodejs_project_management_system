var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var projectSchema = new Schema({
    name: String,
    start_date: Date,
    end_date: Date,
    description: String,
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
});

module.exports = mongoose.model('Project', projectSchema);