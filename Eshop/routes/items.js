const express = require('express');
const {
  getItems,
  getItem,
  addItem,
  updateItem,
  deleteItem
} = require('../controllers/items');

const Item = require('../models/Item');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(
    advancedResults(Item, {
      path: 'item',
      select: 'name description cost amount unit'
    }),
    getItems
  )
  .post(protect, authorize('admin'), addItem);

router
  .route('/:id')
  .get(getItem)
  .put(protect, authorize( 'admin'), updateItem)
  .delete(protect, authorize( 'admin'), deleteItem);

module.exports = router;
