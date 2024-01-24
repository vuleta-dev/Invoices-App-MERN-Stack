const express = require('express');

const { getItems, addItem, deleteItem } = require('../controllers/itemsController')

const router = express.Router();

// Get all Items
router.get('/', getItems)

// POST a new item
router.post('/', addItem)

// DELETE a item
router.delete('/:id', deleteItem)

module.exports = router