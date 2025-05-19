const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// 📌 GET cart for a user
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.json(cart || { userId: req.params.userId, products: [] });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
});

// 📌 POST to add a product to cart
router.post("/", async (req, res) => {
  const { userId, product } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [product] });
    } else {
      const existingProduct = cart.products.find((p) => p.id === product.id);

      if (existingProduct) {
        return res.status(400).json({ message: "Product already in cart" });
      }

      cart.products.push(product);
    }

    await cart.save();
    res.status(201).json({ message: "Added to cart", product });
  } catch (err) {
    res.status(500).json({ message: "Failed to add to cart" });
  }
});

// 📌 PUT to update product quantity
router.put("/:userId", async (req, res) => {
  const { id, quantity } = req.body;
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const product = cart.products.find((p) => p.id === id);
    if (!product) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    product.quantity = quantity;
    await cart.save();

    res.json({ message: "Quantity updated", product });
  } catch (err) {
    res.status(500).json({ message: "Failed to update quantity" });
  }
});

module.exports = router;
