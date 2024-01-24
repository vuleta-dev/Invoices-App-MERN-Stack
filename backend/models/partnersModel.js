const mongoose = require('mongoose');

const Schema = mongoose.Schema

const partnersSchema = new Schema({
    name: {type: String, required: true},  
    address: {type: String, required: true},
    city: {type: String, required: true},
    zip: {type: Number, required: true},
    country: {type: String, required: true}
}, {timestamps: true})

module.exports = mongoose.model('Partners', partnersSchema);