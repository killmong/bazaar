const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  id: Number,
  quantity: Number,
});

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  products: [ProductSchema],
});

module.exports = mongoose.model("Cart", CartSchema);
