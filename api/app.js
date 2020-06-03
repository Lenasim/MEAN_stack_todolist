const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose')

const bodyParser = require('body-parser');
app.use(bodyParser.json());

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
    List.findOneAndRemove({ 
        _id: req.params.id
    })
    .then(removedListDoc => {
        res.send(removedListDoc);
    })
});



app.listen(8000, () => {
    console.log('server is listening on port 8000')
})