const Items = require('../models/itemsModel');
const mongoose = require('mongoose');

// get all items
const getItems = async (req, res) => {
    const itemsData = await Items.find({}).sort({ createdAt: -1 });
    res.status(200).json(itemsData)
}


// add new items
const addItem = async (req, res) => {
    const { invoiceid, desc, qty, rate } = req.body;

    try {
        const itemsData = await Items.create({ invoiceid, desc, qty, rate })
        res.status(200).json(itemsData)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a item
const deleteItem = async (req, res) => {
    const { id } = req.params

    // check if id is in mongoose format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such item' })
    }

    const itemsData = await Items.findOneAndDelete({ _id: id });

    if (!itemsData) {
        return res.status(400).json({ error: 'No such item' })
    }

    res.status(200).json(itemsData)
}


module.exports = { getItems, addItem, deleteItem }