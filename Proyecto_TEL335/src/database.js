const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/test_tel335';

mongoose.connect(uri)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose