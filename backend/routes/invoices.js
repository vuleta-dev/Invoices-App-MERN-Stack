const express = require('express');

const { getInvoices, addInvoice, deleteInvoice, updateInvoice } = require('../controllers/invoicesController')

const router = express.Router();

// Get all Partners
router.get('/', getInvoices)

// POST a new partner
router.post('/', addInvoice)

// DELETE a invoice
router.delete('/:id', deleteInvoice)

// UPDATE a invoice
router.patch('/:id', updateInvoice)


module.exports = router