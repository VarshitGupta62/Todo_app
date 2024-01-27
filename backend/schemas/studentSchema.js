
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    password: Number
});

module.exports = mongoose.model('userdata', studentSchema);
