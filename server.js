require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const AuthRoutes = require("./routes/AuthRoutes");
const ProductRoutes = require("./routes/ProductRoutes");
const cartRoutes = require("./routes/Cart");
const port = process.env.PORT || 5000;
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(cors());
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/user", AuthRoutes);
app.use("/api/product", ProductRoutes);
app.use("/api/cart", cartRoutes);
