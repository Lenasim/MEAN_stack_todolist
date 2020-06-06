const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose')

const bodyParser = require('body-parser');
//Load middleware
app.use(bodyParser.json());
//cors headers middleware
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        return res.status(200).json({});
    };
    next();
});
//Load mongoose model
const { List, Task } = require('./db/models');

//Route handler

//list routes

app.get('/lists', (req, res) => {
    List.find({})
        .then(lists => {
            res.send(lists);
        })
        .catch(e => {
            res.send(e);
        })
});

app.post('/lists', (req, res) => {
    let title = req.body.title;
    let newList = new List({
        title
    });
    newList.save().then(listDoc => {
        res.send(listDoc);
    })
});

app.patch('/lists/:id', (req, res) => {
    List.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    })
        .then(() => {
            res.sendStatus(200);
        })
});

app.delete('/lists/:id', (req, res) => {
    List.findOneAndRemove({ _id: req.params.id })
        .then(removedListDoc => {
            res.send(removedListDoc);
        })
});


//task routes

app.get('/lists/:listId/tasks', (req, res) => {
    Task.find({ _listId: req.params.listId })
        .then(tasks => {
            res.send(tasks);
        })
});

app.post('/lists/:listId/tasks', (req, res) => {
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });
    newTask.save()
        .then(newTaskDoc => {
            res.send(newTaskDoc);
        })
});

app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, {
        $set: req.body
    })
        .then(() => {
            res.send({message: 'Updated successfully!'});
        })
})

app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    })
        .then(removedListDoc => {
            res.send(removedListDoc);
        })
});

app.listen(8000, () => {
    console.log('server is listening on port 8000')
});