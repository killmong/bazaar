import React, { useEffect, useState } from "react";
import axios from "axios";
import CardS from "../../common/ProductCard";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/product/getProducts"
      );
      setProducts(res.data);
      const uniqueCats = [...new Set(res.data.map((p) => p.category))];
      setCategories(["All", ...uniqueCats]);
    } catch (err) {
      console.error("Error fetching all products:", err);
      setProducts([]);
    }
    setLoading(false);
  };

  const fetchProductsByCategory = async (category) => {
    setLoading(true);
    try {
      if (category === "All") {
        await fetchAllProducts();
      } else {
        const res = await axios.get(
          `http://localhost:5000/api/product/getProductsByCategory/${category}`
        );
        setProducts(res.data);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleCategoryChange = (cat) => {
    setCategoryFilter(cat);
    fetchProductsByCategory(cat);
  };
  const [priceFilter, setPriceFilter] = useState("All");
  const [brandFilter, setBrandFilter] = useState("All");

  // Get unique brands from products
  const brands = ["All", ...new Set(products.map((p) => p.brand))];

  // Price ranges
  const priceRanges = [
    { label: "All", value: "All" },
    { label: "Under $50", value: "under50" },
    { label: "$50 - $100", value: "50to100" },
    { label: "Over $100", value: "over100" },
  ];

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    let priceMatch = true;
    let brandMatch = true;

    if (priceFilter === "under50") priceMatch = product.price < 50;
    else if (priceFilter === "50to100")
      priceMatch = product.price >= 50 && product.price <= 100;
    else if (priceFilter === "over100") priceMatch = product.price > 100;

    if (brandFilter !== "All") brandMatch = product.brand === brandFilter;

    return priceMatch && brandMatch;
  });

  return (
    <div className="p-6 overflow-x-hidden">
      <h1 className="text-2xl font-bold mb-4">Product Gallery</h1>

      <div className="flex gap-4 ">
        {/* Sidebar with Categories */}
        <div className="w-1/6 min-w-[150px] sticky left-0  z-50 bg-gray-100 p-4 rounded-lg shadow-md">
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Price</h3>
            <select
              className="w-full p-2 rounded border"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              {priceRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
          {/* Brand Filter */}
          <div>
            <h3 className="font-semibold mb-2">Brand</h3>
            <select
              className="w-full p-2 rounded border"
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
            >
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
          <h2 className="text-lg font-semibold mb-3">Categories</h2>
          <div className="flex flex-col gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`text-left px-3 py-2 rounded ${
                  categoryFilter === cat
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-blue-100"
                }`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* Price Filter */}
        </div>

        {/* Product Cards or Loading Skeleton */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex flex-col bg-neutral-300 w-full h-64 animate-pulse rounded-xl p-4 gap-4"
                >
                  <div className="bg-neutral-400/50 w-full h-32 rounded-md"></div>
                  <div className="flex flex-col gap-2">
                    <div className="bg-neutral-400/50 w-full h-4 rounded-md"></div>
                    <div className="bg-neutral-400/50 w-4/5 h-4 rounded-md"></div>
                    <div className="bg-neutral-400/50 w-full h-4 rounded-md"></div>
                    <div className="bg-neutral-400/50 w-2/4 h-4 rounded-md"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {filteredProducts.map((product) => (
                <CardS key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
