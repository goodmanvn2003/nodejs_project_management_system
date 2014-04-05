/**
 * Created by anhnguyen on 2/22/14.
 */

var Task = require('../../models/task.js');

exports.test = function(req, res) {
    res.json({status : 'good'});
}

exports.getTasks = function(req, res) {
    if (req.session.session_id != null)
    {
        var skip = parseInt(req.query.skip),
            offset = parseInt(req.query.offset);

        if (isNaN(skip)) skip = 0;
        if (isNaN(offset)) offset = 10;

        Task.find({}, null, { skip: skip, limit: offset }, function(err, tasks){
            res.json({ status: 'ok', data: tasks });
        });
    }
    else
        res.json({ status: 'forbidden' });
}