const Invoices = require('../models/invoicesModel');
const mongoose = require('mongoose');

// get all invoices
const getInvoices = async (req, res) => {
    const invoicesData = await Invoices.find({}).sort({ createdAt: -1 });
    res.status(200).json(invoicesData)
}

//  add new invoice
const addInvoice = async (req, res) => {

    const { id, partnerid, Date, DueDate, Status } = req.body;

    try {
        const invoicesData = await Invoices.create({ id, partnerid, Date, DueDate, Status })
        res.status(200).json(invoicesData)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a invoice
const deleteInvoice = async (req, res) => {
    const { id } = req.params

    // check if id is in mongoose format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such invoice' })
    }

    const invoicesData = await Invoices.findOneAndDelete({ _id: id });

    if (!invoicesData) {
        return res.status(400).json({ error: 'No such invoice' })
    }

    res.status(200).json(invoicesData)
}

// update a invoice
const updateInvoice = async (req, res) => {
    const { id } = req.params

    // check if id is in mongoose format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such invoice' })
    }

    const invoicesData = await Invoices.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });


    if (!invoicesData) {
        return res.status(400).json({ error: 'No such invoice' })
    }

    res.status(200).json(invoicesData)
}

module.exports = { getInvoices, addInvoice, deleteInvoice, updateInvoice }