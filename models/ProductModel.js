const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  comment: { type: String },
  date: { type: Date, default: Date.now },
  reviewerName: { type: String },
  reviewerEmail: { type: String },
});

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  price: { type: Number, required: true },
  discountPercentage: { type: Number },
  rating: { type: Number },
  stock: { type: Number },
  tags: [String],
  brand: { type: String },
  shippingInformation: { type: String },
  availabilityStatus: { type: String },
  reviews: [ReviewSchema],
  returnPolicy: { type: String },
  minimumOrderQuantity: { type: Number },
  meta: {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    barcode: { type: String },
    qrCode: { type: String },
  },
  images: [String],
  thumbnail: { type: String },
});

module.exports = mongoose.model("Product", ProductSchema);
