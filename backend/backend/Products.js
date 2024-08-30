const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema  = new Schema({
  title: { type: String, required: true },
  imageURL: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
}, {
  timestamps: true,
});
module.exports = mongoose.model("products", ProductSchema);
