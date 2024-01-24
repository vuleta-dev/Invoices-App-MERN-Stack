const mongoose = require('mongoose');

const Schema = mongoose.Schema

const invoicesSchema = new Schema({
    id: {type: String, required: true},  
    partnerid: {type: String},
    Date: {type: Date},
    DueDate: {type: Date},
    Status: {type: Boolean}
}, {timestamps: true})

module.exports = mongoose.model('Invoices', invoicesSchema);