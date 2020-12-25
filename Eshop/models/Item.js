const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add item name']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description can not be more than 500 characters']
  },
  cost:{
      type: Number,
      required:[true, 'Please add item cost'],
  },
  amount:{
    type: Number,
    required:[true, 'Please add item amount'],
    },
  unit: {
    type: String,
    required: [true, 'Please add unit']
    }
 
});

// Static method to get avg of course tuitions

module.exports = mongoose.model('Item', ItemSchema);