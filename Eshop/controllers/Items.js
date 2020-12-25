const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Item = require('../models/Item');


exports.getItems = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});


exports.getItem = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    return next(
      new ErrorResponse(`No item with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: item
  });
});


exports.addItem = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  
  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to add a item`,
        401
      )
    );
  }

  const item = await Item.create(req.body);

  res.status(200).json({
    success: true,
    data: item
  });
});


exports.updateItem = asyncHandler(async (req, res, next) => {
  let item = await Item.findById(req.params.id);

  if (!item) {
    return next(
      new ErrorResponse(`No item with the id of ${req.params.id}`),
      404
    );
  }

  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update item ${item._id}`,
        401
      )
    );
  }

  item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: item
  });
});


exports.deleteItem = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    return next(
      new ErrorResponse(`No item with the id of ${req.params.id}`),
      404
    );
  }

  if (req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete item ${item._id}`,
        401
      )
    );
  }

  await item.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
