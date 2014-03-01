var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var pluginSchema = new Schema({
    name: String,
    root: String,
    description: String,
    installed_date: Date
});

module.exports = mongoose.model('Plugin', pluginSchema);