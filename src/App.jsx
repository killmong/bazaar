import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/home/Home";
import Shop from "./pages/shop/Shop";
import Category from "./pages/category/Category";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="shop" element={<Shop />} />

          <Route path="/category/:slug" element={<Category />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
