/**
 * Created by anhnguyen on 2/22/14.
 */

var Task = require('../../models/task.js'),
    User = require('../../models/user.js'),
    Project = require('../../models/project.js');

var ObjectId = require('mongoose').Types.ObjectId;

exports.test = function(req, res) {
    res.json(200, {status : 'good'});
}

exports.getTasks = function(req, res) {
    if (req.session.session_id != null)
    {
        var skip = parseInt(req.query.skip),
            offset = parseInt(req.query.offset);

        if (isNaN(skip)) skip = 0;
        if (isNaN(offset)) offset = 10;

        Task.find({}, null, { skip: skip, limit: offset }, function(err, tasks){
            res.json(200, { status: 'ok', meta: { total: Math.ceil(tasks.length/offset) },data: tasks });
        });
    }
    else
        res.json(500, { status: 'forbidden' });
}

exports.updateTask = function(req, res) {
    if (req.session.session_id != null)
    {
        var update_data = req.body.data;

        update_data.data.start_date = new Date(Date.parse(update_data.data.start_date));
        update_data.data.end_date = new Date(Date.parse(update_data.data.end_date));

        Task.findByIdAndUpdate(ObjectId(update_data.meta.id), {$set: update_data.data}, function(err, task)
        {
            if (err) res.json(500, { status: 'error' });
            else
                res.json(200, { status: 'ok' });
        });
    } else
        res.json(500, { status: 'forbidden' });
}

exports.deleteTask = function(req, res) {
    if (req.session.session_id != null)
    {
        Task.findByIdAndRemove(ObjectId(req.body.id), function(err, task)
        {
            if (err) res.json(500, { status: 'error' });
            else
                res.json(200, { status: 'ok' });
        });
    } else
        res.json(500, { status: 'forbidden' });
}

exports.getUsers = function(req, res)
{
    if (req.session.session_id != null && req.session.user_role == 'administrator')
    {
        var skip = parseInt(req.query.skip),
            offset = parseInt(req.query.offset);

        if (isNaN(skip)) skip = 0;
        if (isNaN(offset)) offset = 10;

        if (req.query.type != null && req.query.type != undefined)
        {
            if (req.query.type == 'tabler')
            {
                User.find(function(err, users){
                    var tArray = new Array();

                    tArray.push(['','']);
                    for (var i = 0; i < users.length; i++)
                    {
                        var iArray = new Array();
                        iArray.push(users[i].user_details.name);
                        iArray.push(users[i].user_details.name);
                        tArray.push(iArray);
                    }

                    res.json(200, { status: 'ok', data: tArray });
                });
            }
        } else {
            User.find({}, null, { skip: skip, limit: offset }, function(err, users){
                res.json(200, { status: 'ok', meta: { total: Math.ceil(users.length/offset) } ,data: users });
            });
        }
    }
    else
        res.json(500, { status: 'forbidden' });
}

exports.getProjects = function(req, res)
{
    if (req.session.session_id != null && req.session.user_role == 'administrator')
    {
        Project.find(function(err, projects) {
            res.json({ status: 'ok', data: projects });
        });
    }
    else
        res.json({ status: 'forbidden' });
}