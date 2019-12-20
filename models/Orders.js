const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  service: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
