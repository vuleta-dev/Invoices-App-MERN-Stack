const Partners = require('../models/partnersModel');
const mongoose = require('mongoose');

// get all partners
const getPartners = async (req, res) => {
    const partnersData = await Partners.find({}).sort({ createdAt: -1 });
    res.status(200).json(partnersData)
}

// add new partner
const addPartner = async (req, res) => {
    const { name, address, city, zip, country } = req.body;

    try {
        const partnersData = await Partners.create({ name, address, city, zip, country })
        res.status(200).json(partnersData)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// delete a partner
const deletePartner = async (req, res) => {
    const { id } = req.params

    // check if id is in mongoose format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const partnersData = await Partners.findOneAndDelete({ _id: id });

    if (!partnersData) {
        return res.status(400).json({ error: 'No such partner' })
    }

    res.status(200).json(partnersData)
}

// update a partner
const updatePartner = async (req, res) => {
    const { id } = req.params

    // check if id is in mongoose format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such partner' })
    }

    const partnersData = await Partners.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });


    if (!partnersData) {
        return res.status(400).json({ error: 'No such partner' })
    }

    res.status(200).json(partnersData)
}

module.exports = { getPartners, addPartner, deletePartner, updatePartner }