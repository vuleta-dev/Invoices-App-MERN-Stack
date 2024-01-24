const express = require('express');

const { getPartners, addPartner, deletePartner, updatePartner } = require('../controllers/partnersController')

const router = express.Router();

// Get all Partners
router.get('/', getPartners)

// POST a new partner
router.post('/', addPartner)

// DELETE a partner
router.delete('/:id', deletePartner)

// UPDATE
router.patch('/:id', updatePartner)

module.exports = router