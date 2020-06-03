// handle connection logic to MongoDB
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TaskManager', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('Connected to Mongo DB successfully!');
    })
    .catch(e => {
        console.log(e, 'Error while attempting to connect to MongoDB');
    });

    
//to prevent depreciation warnings(mongodb native driver)
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = { mongoose };