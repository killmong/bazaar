const router = require("express").Router();
const Product = require("../models/ProductModel");
const axios = require("axios");
router.post("/createProduct", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete("/deleteDuplicateProducts", async (req, res) => {
  try {
    const allProducts = await Product.find({});
    const uniqueMap = new Map();
    const duplicateIds = [];

    allProducts.forEach((product) => {
      const key = `${product.title}`; // change as needed
      if (uniqueMap.has(key)) {
        duplicateIds.push(product._id); // duplicate
      } else {
        uniqueMap.set(key, product._id); // first occurrence
      }
    });

    if (duplicateIds.length > 0) {
      await Product.deleteMany({ _id: { $in: duplicateIds } });
      return res.status(200).json({
        message: `${duplicateIds.length} duplicate products deleted.`,
      });
    } else {
      return res.status(200).json({
        message: "No duplicate products found.",
      });
    }
  } catch (err) {
    console.error("Error deleting duplicates:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getProducts", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/getProduct/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/getProductsByCategory/:category", async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.category,
    });
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found in this category" });
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/deleteProducts", async (req, res) => {
  try {
    const deletedProducts = await Product.deleteMany();
    res.status(200).json({ message: "All products deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/importFromDummyJson", async (req, res) => {
  try {
    const response = await axios.get(
      "https://dummyjson.com/products?limit=1000"
    );
    const dummyProducts = response.data.products;

    const transformedProducts = dummyProducts.map((product) => ({
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price,
      discountPercentage: product.discountPercentage,
      rating: product.rating,
      stock: product.stock,
      brand: product.brand,
      // tags, shippingInformation, availabilityStatus, returnPolicy, minimumOrderQuantity, reviews are left empty
      images: product.images || [],
      thumbnail: product.thumbnail,
      meta: {
        createdAt: Date.now(),
        updatedAt: Date.now(),
        barcode: "", // You can generate or leave blank
        qrCode: "", // You can generate or leave blank
      },
    }));

    const saved = await Product.insertMany(transformedProducts);
    res
      .status(201)
      .json({ message: `${saved.length} products imported`, saved });
  } catch (err) {
    console.error("Import error:", err);
    res
      .status(500)
      .json({ error: "Failed to import products", details: err.message });
  }
});
router.delete("/deleteProduct/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
