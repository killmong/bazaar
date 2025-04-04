import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/home/Home";
import Shop from "./pages/shop/Shop";
import Category from "./pages/category/Category";
import Product from "./pages/product/Product";
import Signup from "./(auth)/signup/Signup";
import Login from "./(auth)/login/Login";
import UserContext from "./context/UserContext";
import "./App.css";

function App() {
  return (
    <UserContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/product/:id/:name" element={<Product />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext>
  );
}

export default App;
