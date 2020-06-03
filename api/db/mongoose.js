// handle connection logic to MongoDB
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TaskManager', { useNewUrlParser: true })
    .then(() => {
        console.log('connected to Mongo DB successfully!');
    })
    .catch((err) => {
        console.log(err, 'Error while attempting to connect to MongoDB');
    });

    
//to prevent depreciation warnings(mongodb native driver)
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = { mongoose }