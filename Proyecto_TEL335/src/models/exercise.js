const mongoose = require('mongoose');
const {Schema} = mongoose;

const ExerciseSchema = new Schema({
    user: {type: String, require: true},
    type: {type: String, require: true},
    total: {type: Number, require: true},
    date: {type: Date, require: true},
    description: {type:String, requiere : true}
});

module.exports = mongoose.model('Exercise', ExerciseSchema);